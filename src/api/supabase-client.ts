import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// These environment variables should be set in .env.local
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase credentials not configured. Auth and data operations will fail.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Initialize Supabase auth session listener
 * Call this once in your app root to track auth state changes
 */
export const setupAuthListener = (onAuthStateChange: (session: any) => void) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    onAuthStateChange(session);
  });

  return () => {
    if (data?.subscription) {
      data.subscription.unsubscribe();
    }
  };
};
