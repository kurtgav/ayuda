import React from 'react';
import { useAuth } from '@/context/auth-context';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Screens
import { HomeScreen } from '@/screens/Home/home-screen';
import { MyJobsScreen } from '@/screens/Home/my-jobs-screen';
import { BookingFlowScreen } from '@/screens/Booking/booking-flow-screen';
import { LoginScreen } from '@/screens/Profile/login-screen';
import { RegisterScreen } from '@/screens/Profile/register-screen';
import { ProfileScreen } from '@/screens/Profile/profile-screen';

/**
 * Root Navigator - Web version for Next.js
 * This is a simplified navigator for web that doesn't use React Navigation
 */
export const RootNavigator = () => {
  const { session, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = React.useState<string>('Home');
  const [params, setParams] = React.useState<any>({});

  const navigate = (screen: string, screenParams?: any) => {
    setCurrentScreen(screen);
    setParams(screenParams || {});
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    switch (currentScreen) {
      case 'Register':
        return <RegisterScreen navigation={{ navigate }} />;
      case 'Login':
      default:
        return <LoginScreen navigation={{ navigate }} />;
    }
  }

  switch (currentScreen) {
    case 'MyJobs':
      return <MyJobsScreen navigation={{ navigate }} />;
    case 'BookingFlow':
      return <BookingFlowScreen navigation={{ navigate }} route={{ params }} />;
    case 'Profile':
      return <ProfileScreen navigation={{ navigate }} />;
    case 'Home':
    default:
      return <HomeScreen navigation={{ navigate }} />;
  }
};
