import { useState, useEffect } from 'react';
import { Painting } from '../types';
import { dbHelpers } from '../lib/supabase';

export function usePaintings() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await dbHelpers.getPaintings();
        
        if (error) {
          setError(error.message);
        } else {
          setPaintings(data || []);
        }
      } catch (err) {
        setError('Failed to fetch paintings');
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  const refetch = async () => {
    await fetchPaintings();
  };

  return { paintings, loading, error, refetch };
}

export function usePainting(id: string) {
  const [painting, setPainting] = useState<Painting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        setLoading(true);
        const { data, error } = await dbHelpers.getPaintingById(id);
        
        if (error) {
          setError(error.message);
        } else {
          setPainting(data);
        }
      } catch (err) {
        setError('Failed to fetch painting');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPainting();
    }
  }, [id]);

  return { painting, loading, error };
}