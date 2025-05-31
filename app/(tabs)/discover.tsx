import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useNews } from '@/hooks/useNews';
import { CategoryList } from '@/components/CategoryList';
import { NewsItem } from '@/components/NewsItem';
import { Search, X } from 'lucide-react-native';

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { searchNews, searchResults, loadingSearch, categories } = useNews();
  const router = useRouter();

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      await searchNews(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>Explore news from various categories</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#718096" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for news..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color="#718096" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearching ? (
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              Results for "{searchQuery}"
            </Text>
            <TouchableOpacity onPress={clearSearch}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {loadingSearch ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1A365D" />
            </View>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <NewsItem
                  article={item}
                  onPress={() => router.push(`/news/${item.id}`)}
                />
              )}
              contentContainerStyle={styles.searchResultsList}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    No results found for "{searchQuery}"
                  </Text>
                </View>
              }
            />
          )}
        </View>
      ) : (
        <>
          <CategoryList
            categories={categories}
            onSelectCategory={(category) => router.push(`/category/${category.id}`)}
          />

          <View style={styles.trendingContainer}>
            <Text style={styles.sectionTitle}>Trending Topics</Text>
            <View style={styles.topicsContainer}>
              {['COVID-19', 'Climate Change', 'Economy', 'Elections', 'Technology'].map((topic) => (
                <TouchableOpacity
                  key={topic}
                  style={styles.topicItem}
                  onPress={() => {
                    setSearchQuery(topic);
                    searchNews(topic);
                    setIsSearching(true);
                  }}
                >
                  <Text style={styles.topicText}>{topic}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: '#1A365D',
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#718096',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#2D3748',
  },
  trendingContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 15,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicItem: {
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topicText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#4A5568',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  resultsTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#2D3748',
  },
  clearText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#10B981',
  },
  searchResultsList: {
    paddingHorizontal: 0,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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