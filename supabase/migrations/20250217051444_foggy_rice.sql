/*
  # Fix posts table RLS policies

  1. Changes
    - Drop existing RLS policies
    - Create new policies with proper authentication checks
    - Add policy for admin users to manage all posts
    - Fix policies for post creation and management

  2. Security
    - Enable RLS on posts table
    - Add policies for:
      - Public read access to published posts
      - Authenticated users to create posts
      - Authors to manage their own posts
      - Admin users to manage all posts
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Users can create posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON posts;

-- Create new policies
-- Public can read published posts
CREATE POLICY "Anyone can view published posts"
ON posts FOR SELECT
USING (status = 'published');

-- Authenticated users can view all their own posts
CREATE POLICY "Authors can view all their posts"
ON posts FOR SELECT
TO authenticated
USING (
  auth.uid() = author_id
  OR 
  auth.jwt() ->> 'email' = 'admin@limpow.com.br'
);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = author_id
  OR 
  auth.jwt() ->> 'email' = 'admin@limpow.com.br'
);

-- Authors can update their own posts
CREATE POLICY "Authors can update their own posts"
ON posts FOR UPDATE
TO authenticated
USING (
  auth.uid() = author_id
  OR 
  auth.jwt() ->> 'email' = 'admin@limpow.com.br'
)
WITH CHECK (
  auth.uid() = author_id
  OR 
  auth.jwt() ->> 'email' = 'admin@limpow.com.br'
);

-- Authors can delete their own posts
CREATE POLICY "Authors can delete their own posts"
ON posts FOR DELETE
TO authenticated
USING (
  auth.uid() = author_id
  OR 
  auth.jwt() ->> 'email' = 'admin@limpow.com.br'
);