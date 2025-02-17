/*
  # Add default social media settings

  1. Changes
    - Insert default social media URLs into settings table
    - Update existing settings row if it exists
*/

-- Insert or update social media URLs
INSERT INTO settings (
  facebook_url,
  instagram_url,
  linkedin_url
) VALUES (
  'https://facebook.com/limpow',
  'https://instagram.com/limpow',
  'https://linkedin.com/company/limpow'
)
ON CONFLICT (id) DO UPDATE SET
  facebook_url = EXCLUDED.facebook_url,
  instagram_url = EXCLUDED.instagram_url,
  linkedin_url = EXCLUDED.linkedin_url;