/*
  # Align Database Columns with Frontend Interface

  This migration renames database columns to match the frontend Painting interface exactly,
  eliminating the need for property mapping and resolving the NaN price issue.

  ## Column Mapping Changes:
  - `image_url` → `imageUrl` (camelCase for consistency)
  - `price_eur` → `price` (simplified name, still stores EUR values)
  - `isAvailable` → remains the same (already matches)
  - `createdAt` → remains the same (already matches)
  - `id` → remains the same (already matches)
  
  ## New Columns Added:
  - `title` (text) - separate from description for better content structure
  - `thumbnailUrl` (text) - for optimized gallery display
  - `dimensions` (text) - artwork dimensions
  - `medium` (text) - artistic medium used
  - `updatedAt` (timestamptz) - track record updates

  ## Data Migration:
  - Copy `description` to new `title` column as initial value
  - Set default values for new columns
*/

-- Add new columns first
ALTER TABLE paintings ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE paintings ADD COLUMN IF NOT EXISTS thumbnailUrl text;
ALTER TABLE paintings ADD COLUMN IF NOT EXISTS dimensions text DEFAULT 'Not specified';
ALTER TABLE paintings ADD COLUMN IF NOT EXISTS medium text DEFAULT 'Oil on canvas';
ALTER TABLE paintings ADD COLUMN IF NOT EXISTS updatedAt timestamptz DEFAULT now();

-- Migrate existing data: copy description to title
UPDATE paintings SET title = description WHERE title IS NULL;

-- Set thumbnailUrl to same as image_url initially (can be optimized later)
UPDATE paintings SET thumbnailUrl = image_url WHERE thumbnailUrl IS NULL;

-- Now rename columns to match interface
ALTER TABLE paintings RENAME COLUMN image_url TO imageUrl;
ALTER TABLE paintings RENAME COLUMN price_eur TO price;

-- Make title required now that it's populated
ALTER TABLE paintings ALTER COLUMN title SET NOT NULL;

-- Add trigger to automatically update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_paintings_updated_at ON paintings;
CREATE TRIGGER update_paintings_updated_at
    BEFORE UPDATE ON paintings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verification queries (commented out - uncomment to test)
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'paintings' AND table_schema = 'public'
-- ORDER BY ordinal_position;

-- SELECT id, title, imageUrl, price, isAvailable, createdAt, updatedAt 
-- FROM paintings 
-- LIMIT 5;