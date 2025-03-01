/*
  # Add featured posts functionality

  1. Changes
    - Add featured column to posts table
    - Create index for featured column
    - Create trigger to ensure only one post can be featured at a time

  2. Security
    - No changes to RLS policies needed
*/

-- Add featured column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' AND column_name = 'featured'
  ) THEN
    ALTER TABLE posts ADD COLUMN featured boolean DEFAULT false;
  END IF;
END $$;

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
  BEFORE INSERT OR UPDATE
  ON posts
  FOR EACH ROW
  WHEN (NEW.featured = true)
  EXECUTE FUNCTION handle_featured_post();