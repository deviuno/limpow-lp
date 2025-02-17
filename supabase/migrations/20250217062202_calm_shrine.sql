/*
  # Add landing images storage bucket

  1. New Storage Bucket
    - `landing-images` bucket for storing landing page images
  
  2. Security
    - Enable public access for viewing images
    - Allow authenticated users to upload and delete images
*/

-- Create a new bucket for landing images
INSERT INTO storage.buckets (id, name, public)
VALUES ('landing-images', 'landing-images', true);

-- Create policy to allow public access to landing images
CREATE POLICY "Landing images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'landing-images');

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Users can upload landing images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'landing-images');

-- Create policy to allow authenticated users to delete their images
CREATE POLICY "Users can delete landing images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'landing-images');