# Ayuda Developer Quick Reference

## Start Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with Supabase credentials
cp .env.example .env.local
# Edit and add:
# EXPO_PUBLIC_SUPABASE_URL=...
# EXPO_PUBLIC_SUPABASE_ANON_KEY=...

# 3. Start dev server
npm start

# 4. Open in web browser
npm run web
# Or iOS simulator: npm run ios
# Or Android emulator: npm run android
```

## Project Quick Map

```
📁 src/
├── 🔌 api/              ← Supabase services
├── 🎨 components/       ← Reusable UI (Button, Card, etc)
├── 📄 screens/          ← Full pages (Home, Booking, Profile)
├── 🪝 hooks/            ← useBookingStore (state)
├── 🌍 context/          ← useAuth (global auth)
├── 🗺️  navigation/       ← Tab + Stack nav
├── 🎭 theme/            ← Colors + Typography
├── 📋 types/            ← TypeScript interfaces
└── ⚙️  constants/        ← Service list, messages
```

## Common Tasks

### Add a New Screen

1. Create file: `src/screens/MyFeature/my-feature-screen.tsx`
2. Use `useAuth()` for user context
3. Import components from `@/components/`
4. Add to navigation in `src/navigation/root-navigator.tsx`

**Template:**
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/context/auth-context';
import { colors } from '@/theme/colors';

export const MyFeatureScreen = ({ navigation }) => {
  const { session, profile } = useAuth();
  
  return (
    <View style={styles.container}>
      <Text>Feature name</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.slate[50],
  },
});
```

### Call Supabase API

```typescript
import { getProviders } from '@/api/booking-service';

const { data, error } = await getProviders('plumbing');
if (error) {
  console.error('Failed:', error);
} else {
  // Use data
}
```

### Add Styling

Use NativeWind (Tailwind for RN) or StyleSheet:

```typescript
// Option 1: StyleSheet (preferred for native)
const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

// Option 2: NativeWind (className-like)
<View className="p-4 rounded-lg bg-white" />
```

### Use Zustand State

```typescript
import { useBookingStore } from '@/hooks/use-booking-store';

const { selectedService, setSelectedService } = useBookingStore();
```

## Database Operations

### Query Providers
```typescript
const { data } = await supabase
  .from('providers')
  .select('*')
  .eq('is_vetted', true);
```

### Create Booking
```typescript
const { data, error } = await supabase
  .from('bookings')
  .insert([{
    customer_id: userId,
    service_type: 'plumbing',
    status: 'pending',
  }])
  .select()
  .single();
```

### Update Booking
```typescript
await supabase
  .from('bookings')
  .update({ status: 'confirmed' })
  .eq('id', bookingId);
```

## Key Components

### VettedBadge
```typescript
import { VettedBadge } from '@/components/VettedBadge';

<VettedBadge isVetted={true} size="medium" />
// Output: Green "✓ VETTED" badge
```

### StarRating
```typescript
import { StarRating } from '@/components/StarRating';

<StarRating rating={4.8} size="medium" count={25} />
// Output: 4.8 ★★★★☆ (25 reviews)
```

### ProviderCard
```typescript
import { ProviderCard } from '@/components/ProviderCard';

<ProviderCard provider={providerObject} onPress={() => {}} />
```

## Authentication

### Check if User Logged In
```typescript
const { session } = useAuth();

if (!session) {
  // Show login screen
}
```

### Get Current User Info
```typescript
const { profile } = useAuth();

console.log(profile.full_name);
console.log(profile.is_provider);
```

### Log Out
```typescript
import { logoutUser } from '@/api/auth-service';

await logoutUser();
```

## Error Handling

**Pattern:**
```typescript
import { ERROR_MESSAGES } from '@/constants';
import { ErrorMessage } from '@/components/ErrorMessage';

const [error, setError] = useState(null);

const handleAction = async () => {
  try {
    const { error } = await apiCall();
    if (error) {
      setError(error || ERROR_MESSAGES.GENERIC);
    }
  } catch (err) {
    setError(ERROR_MESSAGES.GENERIC);
  }
};

return error && <ErrorMessage message={error} />;
```

## Testing

### Manual API Test in Supabase
1. Go to Supabase Dashboard → SQL Editor
2. Run queries:
   ```sql
   -- Get all vetted providers
   SELECT * FROM providers WHERE is_vetted = true;
   
   -- Get user's bookings
   SELECT * FROM bookings WHERE customer_id = '<user-id>';
   ```

### Test App Flow
1. Sign up → Check `profiles` table created
2. Browse → Query `providers` works
3. Book → New row in `bookings`
4. View → See booking in "My Jobs"

## Performance Tips

- Use `useSWR` or React Query for data fetching (coming Phase 2)
- Memoize components with `React.memo()` if re-rendering heavily
- Lazy load screens with React.lazy()
- Optimize images before uploading

## Debugging

### Console Logs
```typescript
// Shows in terminal and debugger
console.log('Debug:', variable);
console.error('Error:', error);
```

### React Native Debugger
```bash
# Install
npm install --global react-native-debugger

# Open from app menu: Shift + Ctrl + Z (Android) or Cmd + D (iOS)
```

### Supabase Logs
Check: Supabase Dashboard → Logs → Auth/Database/Realtime

## Common Errors & Fixes

| Error | Solution |
| --- | --- |
| "Supabase not configured" | Add `.env.local` with keys |
| "Auth failed" | Check email format, ensure auth enabled |
| "No providers" | Insert test data in Supabase |
| "RLS policy violation" | Check RLS allows user's query |
| "Network error" | Check `.env.local` URL is correct |

## Deployment Checklist

- [ ] All env vars configured
- [ ] Database schema deployed
- [ ] RLS policies verified
- [ ] Test user created
- [ ] Flows tested end-to-end
- [ ] No console errors
- [ ] Build succeeds: `npm run build`

## Resources

- **[Expo Docs](https://docs.expo.dev)** - Framework
- **[Supabase Docs](https://supabase.com/docs)** - Backend
- **[React Native Docs](https://reactnative.dev)** - Native
- **[React Navigation](https://reactnavigation.org)** - Routing
- **[NativeWind](https://www.nativewind.dev)** - Styling

## Get Help

1. Check **SETUP.md** for installation issues
2. Check **API.md** for backend questions
3. Search **[Expo Community](https://github.com/expo/expo/discussions)**
4. Search **[Supabase Docs](https://supabase.com/docs)**

---

**Happy coding!** 🚀
