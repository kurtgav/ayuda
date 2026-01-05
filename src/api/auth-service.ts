import { supabase } from './supabase-client';
import { Profile } from '@/types';
import { ERROR_MESSAGES } from '@/constants';

/**
 * Register a new user (Email/Password)
 * Creates both auth user and profiles table entry
 */
export const registerUser = async (
  email: string,
  password: string,
  fullName: string,
  isProvider: boolean = false
): Promise<{ error?: string; data?: any }> => {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw new Error(authError.message);

    if (!authData.user) {
      throw new Error('User creation failed');
    }

    // Create profile entry
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: fullName,
          is_provider: isProvider,
          user_type: isProvider ? 'provider' : 'customer',
        },
      ]);

    if (profileError) throw profileError;

    return { data: authData };
  } catch (error: any) {
    return { error: error.message || ERROR_MESSAGES.AUTH_FAILED };
  }
};

/**
 * Login user with email and password
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<{ error?: string; data?: any }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message || ERROR_MESSAGES.AUTH_FAILED };
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<{ error?: string }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return {};
  } catch (error: any) {
    return { error: error.message || ERROR_MESSAGES.GENERIC };
  }
};

/**
 * Get current user profile
 */
export const getCurrentProfile = async (
  userId: string
): Promise<{ error?: string; data?: Profile }> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (
  userId: string,
  updates: Partial<Profile>
): Promise<{ error?: string; data?: Profile }> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};
