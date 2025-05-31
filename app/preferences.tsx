import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { usePreferences } from '@/hooks/usePreferences';
import { ChevronLeft, Check } from 'lucide-react-native';

const categories = [
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'politics', name: 'Politics', icon: '🏛️' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'world', name: 'World News', icon: '🌎' },
  { id: 'food', name: 'Food', icon: '🍔' },
  { id: 'travel', name: 'Travel', icon: '✈️' },
];

export default function PreferencesScreen() {
  const { preferences, updatePreferences } = usePreferences();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [aiPersonalization, setAiPersonalization] = useState(true);
  const [breaking, setBreaking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (preferences?.categories) {
      setSelectedCategories(preferences.categories);
    }
    if (preferences?.aiPersonalization !== undefined) {
      setAiPersonalization(preferences.aiPersonalization);
    }
    if (preferences?.breakingNews !== undefined) {
      setBreaking(preferences.breakingNews);
    }
  }, [preferences]);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const savePreferences = async () => {
    await updatePreferences({
      categories: selectedCategories,
      aiPersonalization,
      breakingNews: breaking
    });
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'News Preferences',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
            color: '#1A365D',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color="#1A365D" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={savePreferences}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>News Categories</Text>
          <Text style={styles.sectionSubtitle}>
            Select categories you're interested in
          </Text>

          <FlatList
            data={categories}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  selectedCategories.includes(item.id) && styles.selectedCategory,
                ]}
                onPress={() => toggleCategory(item.id)}
              >
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    selectedCategories.includes(item.id) &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {item.name}
                </Text>
                {selectedCategories.includes(item.id) && (
                  <View style={styles.checkCircle}>
                    <Check size={12} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalization</Text>

          <View style={styles.switchItem}>
            <View>
              <Text style={styles.switchTitle}>AI Personalization</Text>
              <Text style={styles.switchDescription}>
                Let AI customize your news feed based on your interests
              </Text>
            </View>
            <Switch
              value={aiPersonalization}
              onValueChange={setAiPersonalization}
              trackColor={{ false: '#E2E8F0', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchItem}>
            <View>
              <Text style={styles.switchTitle}>Breaking News</Text>
              <Text style={styles.switchDescription}>
                Receive alerts for important breaking news
              </Text>
            </View>
            <Switch
              value={breaking}
              onValueChange={setBreaking}
              trackColor={{ false: '#E2E8F0', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#10B981',
    paddingHorizontal: 5,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#718096',
    marginBottom: 20,
  },
  categoriesList: {
    paddingVertical: 10,
  },
  categoryItem: {
    flex: 1,
    margin: 6,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    position: 'relative',
  },
  selectedCategory: {
    backgroundColor: '#E6F7FF',
    borderColor: '#1A365D',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#1A365D',
  },
  checkCircle: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  switchTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 4,
  },
  switchDescription: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#718096',
    maxWidth: '80%',
  },
});