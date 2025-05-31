import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { usePreferences } from '@/hooks/usePreferences';
import { ArrowRight } from 'lucide-react-native';

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

export default function OnboardingScreen() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { updatePreferences } = usePreferences();
  const router = useRouter();

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleComplete = async () => {
    await updatePreferences({ categories: selectedCategories });
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Personalize Your News</Text>
        <Text style={styles.subtitle}>
          Select categories that interest you to receive personalized news
        </Text>
      </View>

      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        style={styles.categoriesList}
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
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedCategories.length === 0 && styles.disabledButton,
          ]}
          onPress={handleComplete}
          disabled={selectedCategories.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#1A365D',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    borderWidth: 1,
    borderColor: '#EDF2F7',
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
  footer: {
    padding: 20,
    marginTop: 'auto',
  },
  continueButton: {
    backgroundColor: '#1A365D',
    borderRadius: 12,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: '#CBD5E0',
  },
  continueButtonText: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  skipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  skipButtonText: {
    fontFamily: 'Roboto-Medium',
    color: '#718096',
    fontSize: 14,
  },
});