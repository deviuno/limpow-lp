/*
  # Add CTA tracking

  1. New Tables
    - `cta_clicks`
      - `id` (uuid, primary key)
      - `cta_location` (text) - Where the CTA was clicked
      - `cta_text` (text) - The text of the CTA button
      - `clicked_at` (timestamp)

  2. Security
    - Enable RLS on `cta_clicks` table
    - Add policies for inserting and viewing clicks
*/

-- Create cta_clicks table
CREATE TABLE cta_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cta_location text NOT NULL,
  cta_text text NOT NULL,
  clicked_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cta_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can record a click"
ON cta_clicks FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can view clicks"
ON cta_clicks FOR SELECT
TO authenticated
USING (true);