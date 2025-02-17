/*
  # Add storage bucket for category images

  1. New Storage Bucket
    - Creates a new public bucket for storing category images
    - Enables public access to the bucket
    - Sets up RLS policies for authenticated users to upload/delete images

  2. Security
    - Enables RLS on the bucket
    - Adds policy for public read access
    - Adds policy for authenticated users to upload/delete
*/

-- Create a new bucket for category images
INSERT INTO storage.buckets (id, name, public)
VALUES ('category-images', 'category-images', true);

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access to category images
CREATE POLICY "Category images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'category-images');

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Users can upload category images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'category-images');

-- Create policy to allow authenticated users to delete their images
CREATE POLICY "Users can delete category images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'category-images');