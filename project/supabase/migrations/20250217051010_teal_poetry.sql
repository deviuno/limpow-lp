/*
  # Create posts structure
  
  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `content` (text)
      - `excerpt` (text)
      - `featured_image` (text)
      - `category_id` (uuid, foreign key)
      - `status` (text) - published/draft
      - `meta_title` (text)
      - `meta_description` (text)
      - `views` (integer)
      - `author_id` (uuid, foreign key)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `published_at` (timestamptz)

  2. Security
    - Enable RLS on posts table
    - Add policies for authenticated users to manage posts
    - Add policy for public to read published posts
*/

-- Create posts table
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  excerpt text,
  featured_image text,
  category_id uuid REFERENCES categories(id),
  status text NOT NULL DEFAULT 'draft',
  meta_title text,
  meta_description text,
  views integer DEFAULT 0,
  author_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Public can read published posts
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (status = 'published');

-- Authenticated users can create posts
CREATE POLICY "Users can create posts" ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update their own posts
CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

-- Authenticated users can delete their own posts
CREATE POLICY "Users can delete own posts" ON posts
  FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

-- Create updated_at trigger
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create posts_views table for analytics
CREATE TABLE posts_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  viewer_ip text,
  viewed_at timestamptz DEFAULT now()
);

-- Enable RLS on posts_views
ALTER TABLE posts_views ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting views
CREATE POLICY "Anyone can record a view" ON posts_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create function to increment post views
CREATE OR REPLACE FUNCTION increment_post_views()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to increment views
CREATE TRIGGER increment_post_views_trigger
  AFTER INSERT ON posts_views
  FOR EACH ROW
  EXECUTE FUNCTION increment_post_views();

-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true);

-- Create policies for post images bucket
CREATE POLICY "Post images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

CREATE POLICY "Users can upload post images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'post-images');

CREATE POLICY "Users can delete post images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'post-images');