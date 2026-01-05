import { supabase } from './supabase-client';
import { ERROR_MESSAGES } from '@/constants';

/**
 * Process payment via Supabase Edge Function
 * FR-004: Payment Integration with GCash/Maya
 * 
 * This function securely handles payment processing by:
 * 1. Calling the Edge Function (service role validates on backend)
 * 2. Never exposing payment API keys to frontend
 * 3. Returning transaction reference for confirmation
 */
export const processPayment = async (
  bookingId: string,
  amount: number,
  method: 'gcash' | 'maya'
): Promise<{ error?: string; data?: any }> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      return { error: 'User not authenticated' };
    }

    // Validate inputs
    if (!bookingId || amount <= 0 || !['gcash', 'maya'].includes(method)) {
      return { error: 'Invalid payment parameters' };
    }

    // Call Edge Function
    const { data, error } = await supabase.functions.invoke('process-payment', {
      body: {
        bookingId,
        amount,
        method,
        userId,
      },
    });

    if (error) {
      console.error('Payment processing error:', error);
      return { error: error.message || ERROR_MESSAGES.PAYMENT_FAILED };
    }

    if (!data?.success) {
      return { error: data?.error || ERROR_MESSAGES.PAYMENT_FAILED };
    }

    return { data };
  } catch (error: any) {
    console.error('Payment service error:', error);
    return { error: error.message || ERROR_MESSAGES.PAYMENT_FAILED };
  }
};

/**
 * Get payment status for a booking
 */
export const getPaymentStatus = async (
  bookingId: string
): Promise<{ error?: string; data?: any }> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No payment found
        return { data: null };
      }
      throw error;
    }

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Get all payments for a user (customer perspective)
 */
export const getUserPayments = async (
  userId: string
): Promise<{ error?: string; data?: any[] }> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        id,
        booking_id,
        amount,
        method,
        status,
        transaction_ref,
        created_at,
        bookings(
          id,
          service_type,
          location,
          status
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};
