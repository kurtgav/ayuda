import { supabase } from './supabase-client';
import { Provider, Booking, Review, Payment, BookingStatus } from '@/types';
import { ERROR_MESSAGES } from '@/constants';

/**
 * FR-001 & FR-005: Get all vetted providers or by service type
 */
export const getProviders = async (
  serviceType?: string
): Promise<{ error?: string; data?: Provider[] }> => {
  try {
    let query = supabase.from('providers').select('*').eq('is_vetted', true);

    if (serviceType) {
      query = query.contains('specialties', [serviceType]);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Get single provider details
 */
export const getProviderById = async (
  providerId: string
): Promise<{ error?: string; data?: Provider }> => {
  try {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('profile_id', providerId)
      .single();

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * FR-002: Create a booking
 */
export const createBooking = async (
  customerId: string,
  serviceType: string,
  preferredTime: string,
  location: string,
  description: string
): Promise<{ error?: string; data?: Booking }> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          customer_id: customerId,
          service_type: serviceType,
          status: 'pending' as BookingStatus,
          start_time: preferredTime,
          location,
          description,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message || ERROR_MESSAGES.BOOKING_FAILED };
  }
};

/**
 * FR-006: Get customer's bookings
 */
export const getCustomerBookings = async (
  customerId: string
): Promise<{ error?: string; data?: Booking[] }> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * FR-006: Update booking status
 */
export const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus
): Promise<{ error?: string; data?: Booking }> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * FR-003: Submit a review and rating
 */
export const submitReview = async (
  bookingId: string,
  customerId: string,
  providerId: string,
  rating: number,
  comment?: string,
  photoUrl?: string
): Promise<{ error?: string; data?: Review }> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          booking_id: bookingId,
          customer_id: customerId,
          provider_id: providerId,
          rating,
          comment,
          photo_url: photoUrl,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Update provider's average rating
    await updateProviderRating(providerId);

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Get reviews for a provider
 */
export const getProviderReviews = async (
  providerId: string
): Promise<{ error?: string; data?: Review[] }> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * FR-004: Record payment transaction
 */
export const recordPayment = async (
  bookingId: string,
  amount: number,
  method: 'gcash' | 'maya',
  transactionRef?: string
): Promise<{ error?: string; data?: Payment }> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          booking_id: bookingId,
          amount,
          method,
          transaction_ref: transactionRef,
          status: 'pending' as any,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message || ERROR_MESSAGES.PAYMENT_FAILED };
  }
};

/**
 * Update payment status
 */
export const updatePaymentStatus = async (
  paymentId: string,
  status: 'pending' | 'success' | 'failed'
): Promise<{ error?: string; data?: Payment }> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .update({ status })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;

    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Helper: Update provider's average rating based on all reviews
 */
const updateProviderRating = async (providerId: string): Promise<void> => {
  try {
    const { data: reviews, error: reviewError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('provider_id', providerId);

    if (reviewError || !reviews || reviews.length === 0) return;

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await supabase
      .from('providers')
      .update({
        avg_rating: Math.round(avgRating * 10) / 10,
        job_count: reviews.length,
      })
      .eq('profile_id', providerId);
  } catch (error) {
    console.error('Failed to update provider rating:', error);
  }
};
