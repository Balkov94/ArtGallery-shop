import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Heart, Star } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Original Paintings
            <span className="block text-blue-600">That Inspire</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover unique, handcrafted paintings that transform your space and capture the beauty of life's moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              View Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors"
            >
              About the Artist
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Works Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Works</h2>
            <p className="text-lg text-gray-600">A curated selection of latest paintings</p>
          </div>
          
          {/* Placeholder for featured paintings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center group hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4 group-hover:text-blue-600 transition-colors" />
                  <p className="text-gray-500">Featured Painting {item}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/gallery"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center"
            >
              View All Paintings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Art?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Handcrafted with Love</h3>
              <p className="text-gray-600">Each painting is created with passion and attention to detail, making every piece unique.</p>
            </div>
            
            <div className="text-center">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Using only the finest materials and techniques for long-lasting, vibrant artwork.</p>
            </div>
            
            <div className="text-center">
              <Palette className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Original Creations</h3>
              <p className="text-gray-600">One-of-a-kind pieces that you won't find anywhere else, each telling its own story.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}