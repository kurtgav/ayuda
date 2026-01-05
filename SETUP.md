# AYUDA SETUP GUIDE

## 1. Prerequisites
- Node.js 16+ installed
- npm or yarn
- Supabase account (free tier works for MVP)
- Expo CLI: `npm install -g expo`

## 2. Installation

### Clone and Setup
\`\`\`bash
cd ayuda
npm install
\`\`\`

### Configure Supabase
1. Create a Supabase project: https://supabase.com/dashboard
2. Copy your project URL and Anon Key
3. Create `.env.local` (or rename `.env.example`):
   \`\`\`
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   \`\`\`

### Initialize Database
1. In Supabase console, go to SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Paste and execute in SQL Editor
4. Verify tables are created

## 3. Development

### Start the Dev Server
\`\`\`bash
npm start
\`\`\`

### Run on Web (for quick testing)
\`\`\`bash
npm run web
\`\`\`

### Run on iOS Simulator
\`\`\`bash
npm run ios
\`\`\`

### Run on Android Emulator
\`\`\`bash
npm run android
\`\`\`

## 4. Project Structure

\`\`\`
src/
├── api/              # Supabase client & service functions
├── components/       # Reusable UI components
├── screens/          # Full-screen components (pages)
├── hooks/            # Custom React hooks
├── context/          # React Context providers
├── navigation/       # React Navigation setup
├── theme/            # Colors, typography
├── types/            # TypeScript interfaces
└── constants/        # App constants
\`\`\`

## 5. Architecture Overview

### Tech Stack
- **Frontend:** React Native + Expo
- **Backend:** Supabase (PostgreSQL + Auth)
- **State:** Zustand (bookings) + Context (auth)
- **Styling:** NativeWind (Tailwind for RN)
- **HTTP:** SWR (when needed)

### Data Flow
1. **Auth:** User logs in → Supabase Auth → Session stored in Context
2. **Browse:** User selects service → Fetch providers from DB
3. **Book:** User fills details → Create booking in DB
4. **Payment:** (Placeholder for now) Record transaction
5. **Review:** User rates professional → Store review & update avg rating

### Security (RLS)
All tables use Row Level Security. Users can only access their own data.

## 6. Testing the Core Flow

**Happy Path:**
1. Sign up as customer
2. Select service → Browse providers
3. Click provider → Enter booking details
4. Confirm booking → See in "My Jobs"
5. (Future) Leave review

## 7. Future Enhancements

- [ ] Payment integration (GCash/Maya)
- [ ] Photo upload for job completion
- [ ] Provider app & management UI
- [ ] Loyalty/referral system
- [ ] In-app chat

## 8. Common Issues

### "Supabase credentials not configured"
→ Create `.env.local` with your keys

### "User creation failed"
→ Check email format & ensure auth is enabled in Supabase

### "No providers available"
→ Manually insert test providers in Supabase:
\`\`\`sql
INSERT INTO profiles (id, full_name, is_provider, user_type)
SELECT gen_random_uuid(), 'John Plumber', true, 'provider'
-- Then create provider entry...
\`\`\`

## 9. Contact & Support

For issues, refer to:
- [Expo Docs](https://docs.expo.dev)
- [Supabase Docs](https://supabase.com/docs)
- [React Native Docs](https://reactnative.dev)
