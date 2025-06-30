import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  username: string;
  name: string;
  role: string;
  city: string;
  availability: string;
  whatsapp: string;
  bio: string;
  services: string[];
  created_at: string;
  updated_at: string;
}

export interface Card {
  id: string;
  profile_id: string;
  card_text: string;
  condensed_bio: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryPhoto {
  id: string;
  profile_id: string;
  photo_url: string;
  caption: string;
  display_order: number;
  created_at: string;
}

// Profile operations
export const profileService = {
  async getByUsername(username: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data;
  },

  async create(profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating profile:', error);
      return null;
    }
    
    return data;
  },

  async update(id: string, updates: Partial<Profile>): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating profile:', error);
      return null;
    }
    
    return data;
  }
};

// Card operations
export const cardService = {
  async getActiveByProfileId(profileId: string): Promise<Card | null> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('profile_id', profileId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      console.error('Error fetching card:', error);
      return null;
    }
    
    return data;
  },

  async create(card: Omit<Card, 'id' | 'created_at' | 'updated_at'>): Promise<Card | null> {
    // First, deactivate any existing active cards
    await supabase
      .from('cards')
      .update({ is_active: false })
      .eq('profile_id', card.profile_id)
      .eq('is_active', true);

    // Create new active card
    const { data, error } = await supabase
      .from('cards')
      .insert(card)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating card:', error);
      return null;
    }
    
    return data;
  }
};

// Gallery operations
export const galleryService = {
  async getByProfileId(profileId: string): Promise<GalleryPhoto[]> {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .eq('profile_id', profileId)
      .order('display_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching gallery photos:', error);
      return [];
    }
    
    return data || [];
  },

  async create(photo: Omit<GalleryPhoto, 'id' | 'created_at'>): Promise<GalleryPhoto | null> {
    const { data, error } = await supabase
      .from('gallery_photos')
      .insert(photo)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating gallery photo:', error);
      return null;
    }
    
    return data;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('gallery_photos')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting gallery photo:', error);
      return false;
    }
    
    return true;
  }
};

// Authentication helpers
export const authService = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    return { data, error };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  }
};