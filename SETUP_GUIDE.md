# Ayuda MVP - Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier OK)
- Git

### Local Development Setup

#### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd ayuda
npm install
```

#### 2. Configure Supabase

**Create a Supabase project:**
1. Go to https://supabase.com/dashboard
2. Create a new project
3. Copy your **Project URL** and **Anon Key**

**Setup Database:**
1. In Supabase dashboard, go to SQL Editor
2. Create a new query
3. Copy contents of `supabase/schema.sql`
4. Run the SQL to create all tables

**Example:**
```bash
# Copy from supabase/schema.sql and paste into SQL Editor
```

#### 3. Set Environment Variables

Create `.env.local` in the root:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```dotenv
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 4. Deploy Edge Function

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link your local project to Supabase
supabase link --project-ref your-project-ref

# Deploy the payment processing function
supabase functions deploy process-payment

# Verify deployment
supabase functions list
```

#### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🗄️ Database Setup Details

### Tables Created
1. **profiles** - User accounts (customer/provider)
2. **providers** - Provider-specific info (specialties, vetting, ratings)
3. **bookings** - Service bookings
4. **reviews** - Post-job ratings and feedback
5. **payments** - Payment transaction records

### Row Level Security (RLS)
All tables have RLS enabled with policies:
- Customers see only their own bookings and profiles
- Providers see only assigned bookings
- Public can view vetted providers
- Payments are user-specific

**Policies are automatically applied from schema.sql**

---

## 🔐 Security Configuration

### Supabase Auth Setup

1. **Enable Email Provider:**
   - Go to Authentication → Providers
   - Enable Email
   - Configure email templates if needed

2. **Set JWT Expiry (optional):**
   - Authentication → Settings
   - JWT Expiry: 3600 seconds (1 hour)

### Edge Function Security

**process-payment function uses:**
- Service role key (server-side only)
- User ownership validation
- Input sanitization
- Error handling without exposing sensitive data

**To set service role key in Edge Function:**
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="your-key-here"
```

---

## 🧪 Testing Locally

### Test User Accounts

Create test accounts directly in Supabase:

1. Go to Authentication → Users
2. Add a new user:
   - Email: `customer@test.com`
   - Password: `TestPassword123!`
   - Auto-confirm: Yes

3. Add a provider:
   - Email: `provider@test.com`
   - Password: `TestPassword123!`
   - Auto-confirm: Yes

### Create Test Provider Profile

1. Go to SQL Editor
2. Run:
```sql
-- Insert test provider
INSERT INTO profiles (id, full_name, is_provider, user_type)
VALUES (
  'USER_ID_HERE',  -- Get from auth users table
  'John Plumber',
  true,
  'provider'
);

-- Insert provider details
INSERT INTO providers (profile_id, specialties, is_vetted, avg_rating, job_count, bio)
VALUES (
  'USER_ID_HERE',
  ARRAY['Plumbing', 'General Repairs'],
  true,
  4.5,
  12,
  'Experienced plumber with 10+ years in Manila'
);
```

### Test Booking Flow

1. Sign in as customer
2. Select a service
3. Choose provider
4. Enter location and time
5. Proceed to payment
6. Test with GCash/Maya (sandbox)
7. Complete booking
8. Leave review

---

## 📦 Production Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial Ayuda MVP"
git push origin main
```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Import GitHub repository
   - Select `ayuda` project

3. **Set Environment Variables in Vercel:**
   - Project Settings → Environment Variables
   - Add:
     - `EXPO_PUBLIC_SUPABASE_URL`
     - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy:**
```bash
vercel deploy --prod
```

### Configure Production Supabase

1. **Set up custom domain (optional)**
2. **Enable backups:**
   - Project Settings → Backups
   - Enable weekly/daily backups
3. **Configure CORS if needed:**
   - Project Settings → API Preferences
4. **Enable real-time notifications (optional)**

---

## 📊 Monitoring & Maintenance

### Key Metrics to Track

From Supabase Dashboard:
- Active users
- API requests
- Database size
- Auth signups

Implement tracking:
```typescript
// Example: Log booking creation
console.log(`Booking created: ${bookingId} by ${customerId}`);
```

### Common Issues & Solutions

#### Issue: "Supabase credentials not configured"
**Solution:** Verify `.env.local` has correct values
```bash
echo $EXPO_PUBLIC_SUPABASE_URL  # Should print your URL
```

#### Issue: RLS policies preventing access
**Solution:** Check Row Level Security:
- Supabase Dashboard → Authentication → Policies
- Verify policies match your user role

#### Issue: Payment function not working
**Solution:** Verify Edge Function deployment
```bash
supabase functions list
supabase functions logs process-payment  # View logs
```

#### Issue: CORS errors when calling API
**Solution:** Update CORS in Supabase:
```sql
-- In SQL Editor
UPDATE pg_catalog.pg_settings
SET setting = 'http://localhost:3000,https://yourdomain.com'
WHERE name = 'request.header.origin';
```

---

## 🛠️ Development Workflow

### Updating Database Schema

1. Make changes to `supabase/schema.sql`
2. Drop old tables (in SQL Editor):
```sql
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS providers CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
```
3. Rerun schema.sql
4. Test locally

### Adding New Edge Functions

1. Create function directory:
```bash
supabase functions new my-function
```

2. Implement function in `supabase/functions/my-function/index.ts`

3. Test locally:
```bash
supabase functions serve
```

4. Deploy:
```bash
supabase functions deploy my-function
```

### Updating Components

1. Modify file in `src/components/`
2. Hot reload automatically on save
3. Test in browser

---

## 🚨 Troubleshooting

### Debug Mode

Enable verbose logging:
```typescript
// In src/api/supabase-client.ts
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    debug: true,
  },
});
```

### Check Logs

**Supabase Logs:**
- Go to Logs in Supabase Dashboard
- Filter by table or function

**Edge Function Logs:**
```bash
supabase functions logs process-payment --follow
```

**Browser Console:**
- Open DevTools (F12)
- Check Console tab for errors

---

## 📞 Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Supabase Discord:** https://discord.supabase.com

---

## ✅ Pre-Launch Checklist

- [ ] All environment variables set
- [ ] Database schema deployed
- [ ] Edge Functions deployed
- [ ] Auth enabled and configured
- [ ] RLS policies verified
- [ ] Test users created
- [ ] Booking flow tested end-to-end
- [ ] Payment processing tested (sandbox)
- [ ] Review submission tested
- [ ] Mobile responsiveness checked
- [ ] Performance optimized (images, CSS)
- [ ] Error handling verified
- [ ] Analytics tracking added
- [ ] Backup strategy confirmed
- [ ] Monitoring/alerting set up

---

## 🎉 You're Ready!

Your Ayuda MVP is now ready for launch. Start by:
1. Testing locally
2. Getting feedback from testers
3. Deploy to Vercel
4. Start onboarding providers and customers
5. Monitor metrics and iterate

Good luck! 🚀
