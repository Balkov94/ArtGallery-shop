/*
  # Create Pictures Storage Bucket

  1. Storage
    - Create 'pictures' bucket for image uploads
    - Enable public access for viewing images
    - Set up policies for authenticated users to upload
    - Allow public read access for displaying images

  2. Security
    - Authenticated users can upload images
    - Public read access for image viewing
    - File size and type restrictions handled in application layer
*/

-- Create the pictures storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pictures',
  'pictures', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to upload images to pictures bucket
CREATE POLICY "Authenticated users can upload pictures"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'pictures');

-- Policy: Allow authenticated users to update their own pictures
CREATE POLICY "Users can update own pictures"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'pictures' AND auth.uid()::text = owner);

-- Policy: Allow authenticated users to delete their own pictures
CREATE POLICY "Users can delete own pictures"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'pictures' AND auth.uid()::text = owner);

-- Policy: Allow public read access to pictures
CREATE POLICY "Public can view pictures"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'pictures');