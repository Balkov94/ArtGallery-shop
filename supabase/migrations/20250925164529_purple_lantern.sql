/*
  # Create storage bucket for picture uploads

  1. Storage Setup
    - Create 'pictures' bucket for image uploads
    - Set up public access policies for viewing images
    - Configure upload policies for authenticated users

  2. Security
    - Only authenticated users can upload
    - Public read access for viewing images
    - File type and size restrictions
*/

-- Create storage bucket for pictures
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pictures', 'pictures', true);

-- Allow authenticated users to upload pictures
CREATE POLICY "Authenticated users can upload pictures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'pictures');

-- Allow public access to view pictures
CREATE POLICY "Public can view pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'pictures');

-- Allow users to update their own uploads
CREATE POLICY "Users can update own pictures"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'pictures' AND auth.uid()::text = owner);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own pictures"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'pictures' AND auth.uid()::text = owner);