/*
  # Create Pictures Gallery

  1. New Tables
    - `pictures`
      - `id` (integer, primary key, auto-increment)
      - `image_url` (text, not null)
      - `description` (text, not null)
      - `price_eur` (decimal(10,2), not null)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `pictures` table
    - Add policy for public read access (gallery is public)

  3. Sample Data
    - Insert 5 sample pictures with descriptions and prices
*/

-- Create the pictures table
CREATE TABLE IF NOT EXISTS pictures (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  price_eur DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE pictures ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view the gallery)
CREATE POLICY "Pictures are publicly readable"
  ON pictures
  FOR SELECT
  TO public
  USING (true);

-- Insert sample data
INSERT INTO pictures (image_url, description, price_eur) VALUES
  ('https://picsum.photos/400/300?random=1', 'Mountain landscape', 120.00),
  ('https://picsum.photos/400/300?random=2', 'Golden retriever dog portrait', 85.50),
  ('https://picsum.photos/400/300?random=3', 'Sunset over the ocean', 99.99),
  ('https://picsum.photos/400/300?random=4', 'City skyline at night', 150.00),
  ('https://picsum.photos/400/300?random=5', 'Rustic countryside barn', 75.00);