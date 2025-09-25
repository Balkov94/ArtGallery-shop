import React from 'react';
import { AlertCircle, RefreshCw, Image as ImageIcon, Plus } from 'lucide-react';
import { usePaintings } from '../hooks/usePaintings';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { AddPictureForm } from './AddPictureForm';
import { Painting } from '../types';

interface PaintingCardProps {
  painting: Painting;
}

function PaintingCard({ painting }: PaintingCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative aspect-[4/3] bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <ImageIcon className="h-12 w-12 mb-2" />
            <span className="text-sm">Image unavailable</span>
          </div>
        ) : (
          <img
            src={painting.imageUrl}
            alt={painting.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </div>
      
      <div className="p-4">
        <p className="text-gray-800 font-medium mb-2 line-clamp-2">
          {painting.title}
        </p>
        <p className="text-2xl font-bold text-blue-600">
          {formatPrice(painting.price)}
        </p>
      </div>
    </div>
  );
}

interface PictureGalleryProps {
  className?: string;
}

export function PictureGallery({ className = '' }: PictureGalleryProps) {
  const { paintings, loading, error, refetch } = usePaintings();
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = React.useState(false);

  const handleAddSuccess = () => {
    setShowAddForm(false);
    refetch(); // Refresh the gallery to show the new picture
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-[400px] ${className}`}>
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex justify-center items-center min-h-[400px] ${className}`}>
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to Load Gallery
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (paintings.length === 0) {
    return (
      <div className={`flex justify-center items-center min-h-[400px] ${className}`}>
        <div className="text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Paintings Found
          </h3>
          <p className="text-gray-600">The gallery is currently empty.</p>
        </div>
      </div>
    );
  }

  if (showAddForm) {
    return (
      <div className={className}>
        <AddPictureForm 
          onSuccess={handleAddSuccess}
          onCancel={() => setShowAddForm(false)}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Painting Gallery
          </h2>
          <p className="text-gray-600">
            Discover our collection of {paintings.length} beautiful paintings
          </p>
        </div>
        
        {user && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center sm:justify-start"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Picture
          </button>
        )}
      </div>
      
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paintings.map((painting) => (
          <PaintingCard key={painting.id} painting={painting} />
        ))}
      </div>
    </div>
  );
}