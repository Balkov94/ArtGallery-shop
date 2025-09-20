import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PaintingDetailPage } from '../components/PaintingDetailPage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { usePainting } from '../hooks/usePaintings';

export function PaintingDetail() {
  const { id } = useParams<{ id: string }>();
  const { painting, loading, error } = usePainting(id || '');
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !painting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Painting Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested painting could not be found.'}</p>
          <Link 
            to="/gallery" 
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/gallery" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </div>

      <PaintingDetailPage 
        picture={{
          ...painting,
          artistName: 'Featured Artist' // This would come from the database in a real app
        }} 
      />
    </div>
  );
}