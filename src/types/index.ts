// User profiles
export interface Profile {
  id: string;
  full_name: string;
  phone_number: string;
  is_provider: boolean;
  user_type: 'customer' | 'provider';
  created_at: string;
}

// Service provider details
export interface Provider extends Profile {
  specialties: string[];
  is_vetted: boolean;
  avg_rating: number;
  job_count: number;
  bio?: string;
}

// Service bookings
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customer_id: string;
  provider_id: string | null;
  service_type: string;
  status: BookingStatus;
  start_time: string;
  price_paid: number | null;
  description?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

// Reviews and ratings
export interface Review {
  id: string;
  booking_id: string;
  customer_id: string;
  provider_id: string;
  rating: number; // 1-5
  comment?: string;
  photo_url?: string;
  created_at: string;
}

// Payment tracking
export type PaymentStatus = 'pending' | 'success' | 'failed';

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  method: 'gcash' | 'maya';
  transaction_ref?: string;
  status: PaymentStatus;
  created_at: string;
}

// Booking state
export interface BookingState {
  selectedService: string | null;
  selectedProvider: Provider | null;
  preferredTime: string | null;
  description: string;
  location: string;
}
