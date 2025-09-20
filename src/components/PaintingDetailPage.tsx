import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, ShoppingCart, Star, Send, AlertCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { dbHelpers } from '../lib/supabase';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { Painting, Comment } from '../types';

interface PaintingDetailPageProps {
  picture: Painting & {
    artistName: string;
  };
}

interface InteractionState {
  likesCount: number;
  isLiked: boolean;
  isFavorited: boolean;
  isLikeLoading: boolean;
  isFavoriteLoading: boolean;
}

export function PaintingDetailPage({ picture }: PaintingDetailPageProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');
  const [interactions, setInteractions] = useState<InteractionState>({
    likesCount: 0,
    isLiked: false,
    isFavorited: false,
    isLikeLoading: false,
    isFavoriteLoading: false,
  });
  const [error, setError] = useState('');

  // Fetch painting interactions and comments on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch likes count
        const { data: likes, error: likesError } = await dbHelpers.getPaintingLikes(picture.id);
        if (likesError) throw likesError;

        let isLiked = false;
        let isFavorited = false;

        if (user) {
          // Check if user has liked this painting
          const { data: userLike } = await dbHelpers.getUserLikeStatus(picture.id, user.id);
          isLiked = !!userLike;

          // Check if user has favorited this painting
          const { data: userFavorite } = await dbHelpers.getUserFavoriteStatus(picture.id, user.id);
          isFavorited = !!userFavorite;
        }

        setInteractions({
          likesCount: likes?.length || 0,
          isLiked,
          isFavorited,
          isLikeLoading: false,
          isFavoriteLoading: false,
        });

        // Fetch comments
        const { data: commentsData, error: commentsError } = await dbHelpers.getPaintingComments(picture.id);
        if (commentsError) throw commentsError;

        setComments(commentsData || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load painting data');
      } finally {
        setIsCommentsLoading(false);
      }
    };

    fetchData();
  }, [picture.id, user]);

  const handleLike = async () => {
    if (!user || interactions.isLikeLoading) return;

    setInteractions(prev => ({ ...prev, isLikeLoading: true }));

    // Optimistic update
    const optimisticUpdate = {
      likesCount: interactions.isLiked 
        ? interactions.likesCount - 1 
        : interactions.likesCount + 1,
      isLiked: !interactions.isLiked,
    };

    setInteractions(prev => ({ ...prev, ...optimisticUpdate }));

    try {
      const { data, error } = await dbHelpers.toggleLike(picture.id, user.id);
      if (error) throw error;

      // Update with actual server response
      setInteractions(prev => ({
        ...prev,
        isLiked: data.liked,
        isLikeLoading: false,
      }));
    } catch (err: any) {
      // Revert optimistic update on error
      setInteractions(prev => ({
        ...prev,
        likesCount: interactions.likesCount,
        isLiked: interactions.isLiked,
        isLikeLoading: false,
      }));
      setError(err.message || 'Failed to update like');
    }
  };

  const handleFavorite = async () => {
    if (!user || interactions.isFavoriteLoading) return;

    setInteractions(prev => ({ ...prev, isFavoriteLoading: true }));

    // Optimistic update
    const optimisticFavorited = !interactions.isFavorited;
    setInteractions(prev => ({ ...prev, isFavorited: optimisticFavorited }));

    try {
      const { data, error } = await dbHelpers.toggleFavorite(picture.id, user.id);
      if (error) throw error;

      setInteractions(prev => ({
        ...prev,
        isFavorited: data.favorited,
        isFavoriteLoading: false,
      }));
    } catch (err: any) {
      // Revert optimistic update on error
      setInteractions(prev => ({
        ...prev,
        isFavorited: interactions.isFavorited,
        isFavoriteLoading: false,
      }));
      setError(err.message || 'Failed to update favorite');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || isCommentSubmitting) return;

    // Validate comment
    if (newComment.trim().length < 3) {
      setCommentError('Comment must be at least 3 characters long');
      return;
    }
    if (newComment.length > 500) {
      setCommentError('Comment must be less than 500 characters');
      return;
    }

    setIsCommentSubmitting(true);
    setCommentError('');

    try {
      const { data, error } = await dbHelpers.addComment(picture.id, user.id, newComment.trim());
      if (error) throw error;

      // Add new comment to the top of the list
      setComments(prev => [data, ...prev]);
      setNewComment('');
    } catch (err: any) {
      setCommentError(err.message || 'Failed to post comment');
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Painting Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <img
              src={picture.imageUrl}
              alt={`${picture.title} by ${picture.artistName}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>

        {/* Painting Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {picture.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">by {picture.artistName}</p>
            <p className="text-3xl font-bold text-blue-600 mb-6">
              {formatPrice(picture.price)}
            </p>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{picture.description}</p>
          </div>

          {/* Painting Specifications */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Dimensions:</span>
                <span className="ml-2 font-medium">{picture.dimensions}</span>
              </div>
              <div>
                <span className="text-gray-600">Medium:</span>
                <span className="ml-2 font-medium">{picture.medium}</span>
              </div>
            </div>
          </div>

          {/* Interactive Buttons */}
          {user ? (
            <div className="flex flex-wrap gap-3">
              <button
                disabled={!picture.isAvailable}
                className="flex-1 min-w-[200px] bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {picture.isAvailable ? 'Add to Basket' : 'Sold Out'}
              </button>

              <button
                onClick={handleLike}
                disabled={interactions.isLikeLoading}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  interactions.isLiked
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {interactions.isLikeLoading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <Heart className={`h-5 w-5 ${interactions.isLiked ? 'fill-current' : ''}`} />
                )}
                <span>{interactions.likesCount}</span>
              </button>

              <button
                onClick={handleFavorite}
                disabled={interactions.isFavoriteLoading}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center ${
                  interactions.isFavorited
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {interactions.isFavoriteLoading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <Star className={`h-5 w-5 ${interactions.isFavorited ? 'fill-current' : ''}`} />
                )}
              </button>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 mb-3">
                Please log in to interact with this painting and leave comments.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-8">
        <div className="flex items-center space-x-2 mb-6">
          <MessageCircle className="h-6 w-6 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Comments ({comments.length})
          </h2>
        </div>

        {/* New Comment Form */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this painting..."
                className="w-full resize-none border-0 focus:ring-0 focus:outline-none"
                rows={3}
                maxLength={500}
                disabled={isCommentSubmitting}
              />
              {commentError && (
                <p className="text-red-600 text-sm mt-2">{commentError}</p>
              )}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  {newComment.length}/500 characters
                </span>
                <button
                  type="submit"
                  disabled={!newComment.trim() || isCommentSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isCommentSubmitting ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>Post Comment</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 text-center">
            <p className="text-gray-600">Please log in to leave a comment.</p>
          </div>
        )}

        {/* Comments List */}
        {isCommentsLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="large" />
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {comment.user.avatar ? (
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{comment.user.name}</h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}