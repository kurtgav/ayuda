import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/context/auth-context';
import { RootNavigator } from '@/navigation/root-navigator';

/**
 * Main App Component
 * - Sets up providers
 * - Initializes auth context
 * - Renders root navigator
 */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
