import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/context/AuthContext';
import { PreferenceProvider } from '@/context/PreferenceContext';
import { NewsProvider } from '@/context/NewsContext';

export default function RootLayout() {
  // This hook is required by the framework and must not be removed
  useFrameworkReady();

  return (
    <AuthProvider>
      <PreferenceProvider>
        <NewsProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="news/[id]" options={{ presentation: 'modal' }} />
            <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
          </Stack>
          <StatusBar style="auto" />
        </NewsProvider>
      </PreferenceProvider>
    </AuthProvider>
  );
}