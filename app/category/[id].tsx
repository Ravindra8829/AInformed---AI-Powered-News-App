import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useNews } from '@/hooks/useNews';
import { NewsItem } from '@/components/NewsItem';
import { ChevronLeft } from 'lucide-react-native';

const categoryIcons: Record<string, string> = {
  technology: '💻',
  business: '💼',
  politics: '🏛️',
  health: '🏥',
  science: '🔬',
  sports: '⚽',
  entertainment: '🎬',
  world: '🌎',
  food: '🍔',
  travel: '✈️',
};

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const { getArticlesByCategory } = useNews();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      if (id) {
        const categoryArticles = await getArticlesByCategory(id.toString());
        setArticles(categoryArticles);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id]);

  const getCategoryName = (categoryId: string) => {
    const categories = {
      technology: 'Technology',
      business: 'Business',
      politics: 'Politics',
      health: 'Health',
      science: 'Science',
      sports: 'Sports',
      entertainment: 'Entertainment',
      world: 'World News',
      food: 'Food',
      travel: 'Travel',
    };
    return categories[categoryId as keyof typeof categories] || categoryId;
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: getCategoryName(id?.toString() || ''),
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
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1A365D" />
          </View>
        ) : (
          <>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>
                {categoryIcons[id?.toString() || ''] || '📰'}
              </Text>
              <Text style={styles.categoryTitle}>
                {getCategoryName(id?.toString() || '')}
              </Text>
              <Text style={styles.categoryCount}>{articles.length} articles</Text>
            </View>

            <FlatList
              data={articles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <NewsItem
                  article={item}
                  onPress={() => router.push(`/news/${item.id}`)}
                />
              )}
              contentContainerStyle={styles.list}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    No articles found in this category
                  </Text>
                </View>
              }
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryHeader: {
    padding: 20,
    backgroundColor: '#F7FAFC',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  categoryTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#1A365D',
    marginBottom: 5,
  },
  categoryCount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#718096',
  },
  list: {
    paddingBottom: 20,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
});