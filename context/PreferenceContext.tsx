import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Preferences {
  categories: string[];
  aiPersonalization: boolean;
  breakingNews: boolean;
}

interface PreferenceContextType {
  preferences: Preferences | null;
  loading: boolean;
  updatePreferences: (newPreferences: Partial<Preferences>) => Promise<void>;
}

const defaultPreferences: Preferences = {
  categories: ['technology', 'business'],
  aiPersonalization: true,
  breakingNews: true,
};

export const PreferenceContext = createContext<PreferenceContextType>({
  preferences: null,
  loading: true,
  updatePreferences: async () => {},
});

interface PreferenceProviderProps {
  children: React.ReactNode;
}

export function PreferenceProvider({ children }: PreferenceProviderProps) {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load preferences from AsyncStorage
    const loadPreferences = async () => {
      try {
        const preferencesString = await AsyncStorage.getItem('preferences');
        if (preferencesString) {
          setPreferences(JSON.parse(preferencesString));
        } else {
          // Set default preferences if none exist
          setPreferences(defaultPreferences);
          await AsyncStorage.setItem('preferences', JSON.stringify(defaultPreferences));
        }
      } catch (error) {
        console.error('Error loading preferences from storage:', error);
        // Set default preferences on error
        setPreferences(defaultPreferences);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = async (newPreferences: Partial<Preferences>) => {
    try {
      const updatedPreferences = {
        ...preferences,
        ...newPreferences,
      } as Preferences;
      
      setPreferences(updatedPreferences);
      await AsyncStorage.setItem('preferences', JSON.stringify(updatedPreferences));
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  };

  return (
    <PreferenceContext.Provider value={{ preferences, loading, updatePreferences }}>
      {children}
    </PreferenceContext.Provider>
  );
}