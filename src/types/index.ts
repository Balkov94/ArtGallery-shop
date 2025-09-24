// Core application types
export interface Picture {
  id: string;
  image_url: string;
  description: string;
  price_eur: number;
  created_at: string;
}

export interface Painting {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  thumbnailUrl: string;
  dimensions: string;
  medium: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  paintingId: string;
  painting: Painting;
  quantity: number;
  addedAt: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface Comment {
  id: string;
  paintingId: string;
  userId: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    avatar?: string;
  };
}

export interface PaintingLike {
  id: string;
  paintingId: string;
  userId: string;
  createdAt: string;
}

export interface UserFavorite {
  id: string;
  paintingId: string;
  userId: string;
  createdAt: string;
}