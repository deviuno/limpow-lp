/*
  # Allow Multiple Featured Posts

  1. Changes
    - Removes the trigger that limits featured posts to one
    - Keeps the featured column and index
    - Allows multiple posts to be featured simultaneously

  2. Notes
    - Existing featured posts will remain unchanged
    - No data loss or modification of existing posts
*/

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS featured_post_trigger ON posts;
DROP FUNCTION IF EXISTS handle_featured_post();

-- Keep the index for performance
CREATE INDEX IF NOT EXISTS posts_featured_idx ON posts(featured) WHERE featured = true;