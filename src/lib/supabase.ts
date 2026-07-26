import { createClient } from '@supabase/supabase-js';

// Default to official KineByte Supabase instance if VITE_SUPABASE_URL is unconfigured or has a typo
const DEFAULT_SUPABASE_URL = 'https://snpzrxgeauilbyqzqjtb.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_V2uCLjS7t5vDYJUuxp9VEQ_j_D3GOIC';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
