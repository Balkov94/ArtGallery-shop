import React, { useState, useEffect } from 'react';
import { Palette, Mail, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePostAuthRedirect } from '../hooks/useAuthRedirect';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { PasswordInput } from '../components/ui/PasswordInput';
import { supabase } from '../lib/supabase';

export function Auth() {
  usePostAuthRedirect();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signIn, signUp, user } = useAuth();

  useEffect(() => {
    setError('');
    setSuccess('');
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError('Invalid email or password. Please try again.');
        }
      } else {
        // Signup flow: prevent redirect, stay on page
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin }
        });

        if (error) {
          if (
            error.message.includes('already registered') ||
            error.message.includes('already exists') ||
            error.message.includes('duplicate')
          ) {
            setError('This email is already in use.');
          } else if (error.message.includes('Password should be at least')) {
            setError('Password must be at least 6 characters long.');
          } else if (error.message.includes('Unable to validate email address')) {
            setError('Please enter a valid email address.');
          } else {
            setError(error.message);
          }
        } else {
          setSuccess("We've sent you a verification email. Please check your inbox.");
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLogin && success && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Palette className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">Email Sent!</span>
          </div>
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
            We've sent you a verification email. Please check your inbox.
          </div>
          <p className="text-gray-600 mb-6 text-sm">
            Click the verification link in your email to activate your account, then return here to sign in.
          </p>
          <button
            onClick={() => {
              setSuccess('');
              setIsLogin(true);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Palette className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ArtGallery</span>
          </div>
          <h2 className="text-xl text-gray-600">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md font-medium">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
              disabled={loading}
              autoComplete={isLogin ? "current-password" : "new-password"}
              aria-label="Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <LoadingSpinner size="small" /> : isLogin ? 'Sign In' : 'Create Account'}
            {loading && <span className="ml-2">{isLogin ? 'Signing in...' : 'Creating account...'}</span>}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
              className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
