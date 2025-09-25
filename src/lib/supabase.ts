import { createClient } from '@supabase/supabase-js';

// Note: These will be available when Supabase is connected
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const authHelpers = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
};

// Database helper functions
export const dbHelpers = {
  // Pictures
  getPictures: async () => {
    const { data, error } = await supabase
      .from('pictures')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  getPictureById: async (id: string) => {
    const { data, error } = await supabase
      .from('pictures')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  // Paintings
  getPaintings: async () => {
    const { data, error } = await supabase
      .from('paintings')
      .select(`
        id,
        title,
        description,
        price,
        imageUrl,
        thumbnailUrl,
        dimensions,
        medium,
        isAvailable,
        createdAt,
        updatedAt
      `)
      .eq('isAvailable', true)
      .order('createdAt', { ascending: false });
    
    return { data, error };
  },

  getPaintingById: async (id: string) => {
    const { data, error } = await supabase
      .from('paintings')
      .select(`
        id,
        title,
        description,
        price,
        imageUrl,
        thumbnailUrl,
        dimensions,
        medium,
        isAvailable,
        createdAt,
        updatedAt
      `)
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  // Cart operations (placeholder structure)
  getCartItems: async (userId: string) => {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        paintings (*)
      `)
      .eq('userId', userId);
    
    return { data, error };
  },

  // Likes operations
  getPaintingLikes: async (paintingId: string) => {
    const { data, error } = await supabase
      .from('painting_likes')
      .select('*')
      .eq('paintingId', paintingId);
    
    return { data, error };
  },

  getUserLikeStatus: async (paintingId: string, userId: string) => {
    const { data, error } = await supabase
      .from('painting_likes')
      .select('*')
      .eq('paintingId', paintingId)
      .eq('userId', userId)
      .single();
    
    return { data, error };
  },

  toggleLike: async (paintingId: string, userId: string) => {
    // Check if like exists
    const { data: existingLike } = await supabase
      .from('painting_likes')
      .select('*')
      .eq('paintingId', paintingId)
      .eq('userId', userId)
      .single();

    if (existingLike) {
      // Remove like
      const { error } = await supabase
        .from('painting_likes')
        .delete()
        .eq('id', existingLike.id);
      return { data: { liked: false }, error };
    } else {
      // Add like
      const { data, error } = await supabase
        .from('painting_likes')
        .insert([{ paintingId, userId }])
        .select()
        .single();
      return { data: { liked: true, ...data }, error };
    }
  },

  // Favorites operations
  getUserFavoriteStatus: async (paintingId: string, userId: string) => {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('*')
      .eq('paintingId', paintingId)
      .eq('userId', userId)
      .single();
    
    return { data, error };
  },

  toggleFavorite: async (paintingId: string, userId: string) => {
    // Check if favorite exists
    const { data: existingFavorite } = await supabase
      .from('user_favorites')
      .select('*')
      .eq('paintingId', paintingId)
      .eq('userId', userId)
      .single();

    if (existingFavorite) {
      // Remove favorite
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('id', existingFavorite.id);
      return { data: { favorited: false }, error };
    } else {
      // Add favorite
      const { data, error } = await supabase
        .from('user_favorites')
        .insert([{ paintingId, userId }])
        .select()
        .single();
      return { data: { favorited: true, ...data }, error };
    }
  },

  // Comments operations
  getPaintingComments: async (paintingId: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        user:users(name, avatar)
      `)
      .eq('paintingId', paintingId)
      .order('createdAt', { ascending: false });
    
    return { data, error };
  },

  addComment: async (paintingId: string, userId: string, content: string) => {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ paintingId, userId, content }])
      .select(`
        *,
        user:users(name, avatar)
      `)
      .single();
    
    return { data, error };
  },
};