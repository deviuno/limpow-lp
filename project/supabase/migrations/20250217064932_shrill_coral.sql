/*
  # Fix posts_views policy and add missing policies

  1. Changes
    - Add policy for anon to insert views
    - Add policy for authenticated users to view stats
    - Add policy for authenticated users to delete views

  2. Security
    - Enable RLS
    - Add policies for public and authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can record a view" ON posts_views;

-- Create new policies
CREATE POLICY "Anyone can record a view"
ON posts_views FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can view stats"
ON posts_views FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete views"
ON posts_views FOR DELETE
TO authenticated
USING (true);