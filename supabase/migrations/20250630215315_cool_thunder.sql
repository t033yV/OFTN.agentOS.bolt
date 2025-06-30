/*
  # Initial Schema for OFTN AgentOS

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `name` (text)
      - `role` (text)
      - `city` (text)
      - `availability` (text)
      - `whatsapp` (text)
      - `bio` (text)
      - `services` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `cards`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `card_text` (text)
      - `condensed_bio` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `gallery_photos`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `photo_url` (text)
      - `caption` (text)
      - `display_order` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to profiles and cards
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  city text NOT NULL,
  availability text NOT NULL,
  whatsapp text NOT NULL,
  bio text NOT NULL,
  services text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cards table
CREATE TABLE IF NOT EXISTS cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  card_text text NOT NULL,
  condensed_bio text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_photos table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  photo_url text NOT NULL,
  caption text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Users can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for cards table
CREATE POLICY "Anyone can read active cards"
  ON cards
  FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Users can manage their own cards"
  ON cards
  FOR ALL
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE id = auth.uid()))
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE id = auth.uid()));

-- Policies for gallery_photos table
CREATE POLICY "Anyone can read gallery photos"
  ON gallery_photos
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can manage their own gallery photos"
  ON gallery_photos
  FOR ALL
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE id = auth.uid()))
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_cards_profile_id ON cards(profile_id);
CREATE INDEX IF NOT EXISTS idx_cards_active ON cards(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_profile_id ON gallery_photos(profile_id);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_order ON gallery_photos(profile_id, display_order);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cards_updated_at
  BEFORE UPDATE ON cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();