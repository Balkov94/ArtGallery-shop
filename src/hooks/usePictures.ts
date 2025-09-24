import { useState, useEffect } from 'react';
import { Picture } from '../types';
import { dbHelpers } from '../lib/supabase';

export function usePictures() {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await dbHelpers.getPictures();
        
        if (error) {
          setError(error.message);
        } else {
          setPictures(data || []);
        }
      } catch (err) {
        setError('Failed to fetch pictures');
        console.error('Error fetching pictures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPictures();
  }, []);

  const refetch = async () => {
    await fetchPictures();
  };

  return { pictures, loading, error, refetch };
}

export function usePicture(id: string) {
  const [picture, setPicture] = useState<Picture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPicture = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await dbHelpers.getPictureById(id);
        
        if (error) {
          setError(error.message);
        } else {
          setPicture(data);
        }
      } catch (err) {
        setError('Failed to fetch picture');
        console.error('Error fetching picture:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPicture();
    }
  }, [id]);

  return { picture, loading, error };
}