import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;

  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error?: string; success?: string }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return;

    // Get initial session
    const { data: { session } } = await supabase.auth.getSession();
    set({
      user: session?.user ?? null,
      session,
      loading: false,
      initialized: true,
    });

    // Listen for auth changes (login, logout, token refresh)
    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    });
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true });
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      set({ loading: false });
      return { error: error.message };
    }

    set({ loading: false });
    return {};
  },

  signUp: async (name: string, email: string, password: string) => {
    set({ loading: true });
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'Usuario',
          source: 'kinebytes-shop', // Track registration origin for KineByte
        },
      },
    });

    if (error) {
      set({ loading: false });
      return { error: error.message };
    }

    set({ loading: false });
    return { success: '¡Cuenta creada! Revisa tu correo para confirmar tu cuenta.' };
  },

  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ user: null, session: null, loading: false });
  },
}));
