# Ayuda API Documentation

## Overview

The Ayuda API is built on **Supabase** (PostgreSQL + Auth) with RLS for security. All interactions go through the Supabase JavaScript SDK.

## Authentication Flow

### 1. Sign Up (Register)
```typescript
registerUser(email, password, fullName, isProvider)
// Creates auth user + profiles table entry
// Returns: { data: { user: { id, email } } }
```

### 2. Sign In (Login)
```typescript
loginUser(email, password)
// Returns: { data: { session: { user: { id }, ... } } }
// Session auto-managed by Supabase
```

### 3. Get Current User
```typescript
const { data: { session } } = await supabase.auth.getSession()
// useAuth() hook provides this automatically
```

### 4. Sign Out
```typescript
logoutUser()
// Clears session
```

## Core Services

### FR-001 & FR-005: Provider Management

#### Get Providers (Vetted)
```typescript
getProviders(serviceType?: string)
// Returns all vetted providers, optionally filtered by service type
// Returns: Provider[]
```

#### Get Single Provider
```typescript
getProviderById(providerId)
// Returns: Provider
```

**Provider Schema:**
```typescript
interface Provider {
  id: string;
  profile_id: string;
  specialties: string[]; // e.g., ['Plumbing', 'Electrical']
  is_vetted: boolean;    // Trust signal
  avg_rating: number;    // 0-5
  job_count: number;     // Completed jobs
  bio?: string;
}
```

### FR-002: Instant Booking

#### Create Booking
```typescript
createBooking(
  customerId: string,
  serviceType: string,
  preferredTime: string,
  location: string,
  description: string
)
// Returns: { id, customer_id, service_type, status: 'pending', ... }
```

#### Get Customer Bookings
```typescript
getCustomerBookings(customerId)
// Returns: Booking[]
// Ordered by created_at (newest first)
```

#### Update Booking Status
```typescript
updateBookingStatus(bookingId, status)
// Status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
```

**Booking Schema:**
```typescript
interface Booking {
  id: string;
  customer_id: string;
  provider_id?: string;
  service_type: string;
  status: BookingStatus;
  start_time: string; // ISO 8601
  location: string;
  description: string;
  price_paid?: number;
  created_at: string;
  updated_at: string;
}
```

### FR-003: Reviews & Ratings

#### Submit Review
```typescript
submitReview(
  bookingId: string,
  customerId: string,
  providerId: string,
  rating: number,        // 1-5
  comment?: string,
  photoUrl?: string      // Completion proof
)
// Automatically updates provider's avg_rating
// Returns: Review
```

#### Get Provider Reviews
```typescript
getProviderReviews(providerId)
// Returns: Review[]
// Ordered by created_at (newest first)
```

**Review Schema:**
```typescript
interface Review {
  id: string;
  booking_id: string;
  customer_id: string;
  provider_id: string;
  rating: number;      // 1-5
  comment?: string;
  photo_url?: string;  // Proof of completion
  created_at: string;
}
```

### FR-004: Payments (Placeholder)

#### Record Payment
```typescript
recordPayment(
  bookingId: string,
  amount: number,
  method: 'gcash' | 'maya',
  transactionRef?: string
)
// Returns: Payment with status: 'pending'
```

#### Update Payment Status
```typescript
updatePaymentStatus(paymentId, status)
// Status: 'pending' | 'success' | 'failed'
```

**Payment Schema:**
```typescript
interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  method: 'gcash' | 'maya';
  transaction_ref?: string;
  status: 'pending' | 'success' | 'failed';
  created_at: string;
  updated_at: string;
}
```

## Error Handling

All service functions return `{ error?, data? }`:

```typescript
const { data, error } = await getProviders()

if (error) {
  console.error('Failed:', error)
  // User-friendly messages in constants/index.ts
} else {
  // Use data
}
```

**Common Error Messages:**
- `ERROR_MESSAGES.NO_INTERNET`
- `ERROR_MESSAGES.AUTH_FAILED`
- `ERROR_MESSAGES.BOOKING_FAILED`
- `ERROR_MESSAGES.PAYMENT_FAILED`
- `ERROR_MESSAGES.GENERIC`

## Security (Row Level Security)

All tables enforce RLS policies:

| Table | Readable By | Writable By |
| --- | --- | --- |
| `profiles` | Self | Self (updates) |
| `providers` | Public (if vetted) | Provider (self) |
| `bookings` | Customer or assigned provider | System (inserts/updates) |
| `reviews` | Public | Customer (inserts) |
| `payments` | User owning booking | System (inserts/updates) |

## Real-Time Subscriptions

For live updates (Phase 2), use:
```typescript
const subscription = supabase
  .from('bookings')
  .on('*', (payload) => {
    console.log('Booking changed:', payload)
  })
  .subscribe()

// Cleanup
subscription.unsubscribe()
```

## Environment Variables

Required in `.env.local`:
```env
EXPO_PUBLIC_SUPABASE_URL=<your-project-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

**Never expose these secrets:**
- Service role key
- GCash/Maya API keys
- Admin credentials

## Testing

### Manual Testing Flow
1. Sign up as customer
2. Fetch providers: `GET /providers?service=plumbing`
3. Create booking: `POST /bookings`
4. Get bookings: `GET /bookings?customer_id=<uid>`
5. Submit review: `POST /reviews`

### Using Supabase Studio
1. Go to Supabase Dashboard
2. Table Editor → view/edit data directly
3. SQL Editor → run queries
4. Example queries in `SETUP.md`

## Rate Limiting

Supabase free tier limits:
- 50k requests/month
- 500 active users simultaneously
- 1 Mbps bandwidth

Monitor at: https://supabase.com/dashboard/project/settings/usage

## Future Enhancements

- [ ] Edge Functions for GCash/Maya integration
- [ ] Realtime job updates via subscriptions
- [ ] File storage for completion photos
- [ ] Vector search for provider discovery
- [ ] Analytics dashboard

## Support

- [Supabase JS SDK Docs](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Full-Text Search](https://supabase.com/docs/guides/database/full-text-search)
