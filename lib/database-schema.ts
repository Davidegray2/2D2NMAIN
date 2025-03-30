// This file defines the database schema for the application
// It's used for TypeScript type checking and documentation

export interface Profile {
  id: string
  username: string
  full_name?: string
  avatar_url?: string
  email?: string
  created_at: string
  updated_at: string
  membership_tier?: "Basic Member" | "Premium Member" | "Elite Member"
  workout_preferences?: string[]
  bio?: string
  active: boolean
  last_active_at?: string
}

export interface SpotterRequest {
  id: number
  from_user_id: string
  to_user_id: string
  status: "pending" | "accepted" | "declined"
  created_at: string
  updated_at: string
}

export interface SpotterRelationship {
  id: number
  user_id: string
  spotter_id: string
  created_at: string
}

// Database schema for reference:
/*
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  membership_tier TEXT DEFAULT 'Basic Member',
  workout_preferences TEXT[] DEFAULT '{}',
  bio TEXT,
  active BOOLEAN DEFAULT TRUE,
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spotter requests table
CREATE TABLE spotter_requests (
  id SERIAL PRIMARY KEY,
  from_user_id UUID REFERENCES profiles(id),
  to_user_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id)
);

-- Create spotters relationship table
CREATE TABLE spotters (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  spotter_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, spotter_id)
);
*/

