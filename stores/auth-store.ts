import { create } from 'zustand';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;

  initialize: () => Promise<void>;
  signIn: (email: string, password: string, captchaToken?: string) => Promise<{ error?: string }>;
  signUp: (name: string, email: string, password: string, captchaToken?: string) => Promise<{ error?: string; success?: string }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return;
    const supabase = getSupabaseBrowserClient();

    const { data: { session } } = await supabase.auth.getSession();
    set({
      user: session?.user ?? null,
      session,
      loading: false,
      initialized: true,
    });

    supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      set({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    });
  },

  signIn: async (email: string, password: string, captchaToken?: string) => {
    set({ loading: true });
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: captchaToken ? { captchaToken } : undefined,
    });

    if (error) {
      set({ loading: false });
      return { error: error.message };
    }

    set({ loading: false });
    return {};
  },

  signUp: async (name: string, email: string, password: string, captchaToken?: string) => {
    set({ loading: true });
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'Usuario',
          source: 'kinebytes-shop',
        },
        captchaToken: captchaToken || undefined,
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
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    set({ user: null, session: null, loading: false });
  },
}));
