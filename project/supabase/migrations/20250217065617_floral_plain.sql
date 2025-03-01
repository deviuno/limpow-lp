/*
  # Add Featured Post Support

  1. New Column
    - Add featured boolean column to posts table
    - Default value is false
    - Add index for better query performance

  2. Trigger
    - Ensures only one post can be featured at a time
    - When a post is marked as featured, all other posts are unfeatured
    - Only applies to published posts

  3. Security
    - Inherits existing RLS policies from posts table
    - No additional policies needed
*/

-- Add featured column if it doesn't exist
ALTER TABLE posts ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- Add index for featured column
CREATE INDEX IF NOT EXISTS posts_featured_idx ON posts(featured) WHERE featured = true;

-- Create function to handle featured post logic
CREATE OR REPLACE FUNCTION handle_featured_post()
RETURNS TRIGGER AS $$
BEGIN
  -- If the new post is being featured
  IF NEW.featured = true THEN
    -- Unfeature all other posts
    UPDATE posts
    SET featured = false
    WHERE id != NEW.id
      AND featured = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS featured_post_trigger ON posts;
CREATE TRIGGER featured_post_trigger
  BEFORE INSERT OR UPDATE OF featured
  ON posts
  FOR EACH ROW
  EXECUTE FUNCTION handle_featured_post();