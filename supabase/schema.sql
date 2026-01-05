-- PROFILES: User identity and basic info
-- Linked to Supabase auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  is_provider BOOLEAN DEFAULT FALSE,
  user_type TEXT CHECK (user_type IN ('customer', 'provider')) DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROVIDERS: Extended info for service professionals
-- FR-001 & FR-005: Vetting, Ratings, Skills
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  specialties TEXT[] DEFAULT '{}', -- Array: e.g., ['Plumbing', 'Electrical']
  is_vetted BOOLEAN DEFAULT FALSE, -- Trust signal
  avg_rating DECIMAL(3, 2) DEFAULT 0,
  job_count INTEGER DEFAULT 0,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BOOKINGS: Core transaction record
-- FR-002: Instant booking
-- FR-006: Job management
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES providers(profile_id) ON DELETE SET NULL,
  service_type TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  start_time TIMESTAMP WITH TIME ZONE,
  location TEXT,
  description TEXT,
  price_paid DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- REVIEWS: Ratings and feedback
-- FR-003: Reviews & ratings system
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES providers(profile_id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  photo_url TEXT, -- Completion proof
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PAYMENTS: Cashless transaction tracking
-- FR-004: GCash/Maya payment integration
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  method TEXT CHECK (method IN ('gcash', 'maya')),
  transaction_ref TEXT,
  status TEXT CHECK (status IN ('pending', 'success', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- BASIC RLS POLICIES (Security-first)

-- Profiles: Users can read own profile, admins can manage all
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Providers: Public can view vetted, providers can manage own
CREATE POLICY "Anyone can view vetted providers"
  ON providers FOR SELECT
  USING (is_vetted = true);

CREATE POLICY "Providers can view own info"
  ON providers FOR SELECT
  USING (profile_id = auth.uid());

-- Bookings: Customers can see own, providers can see assigned
CREATE POLICY "Customers can view own bookings"
  ON bookings FOR SELECT
  USING (customer_id = auth.uid());

CREATE POLICY "Providers can view assigned bookings"
  ON bookings FOR SELECT
  USING (provider_id = (SELECT profile_id FROM providers WHERE profile_id = auth.uid()));

-- Reviews: Public can read, users can create own
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Customers can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (customer_id = auth.uid());

-- Payments: Users can view own
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (booking_id IN (SELECT id FROM bookings WHERE customer_id = auth.uid()));
