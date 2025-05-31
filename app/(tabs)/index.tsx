import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Share } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useNews } from '@/hooks/useNews';
import { NewsCard } from '@/components/NewsCard';
import { NewsFilters } from '@/components/NewsFilters';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Share2, Bookmark, BookmarkCheck } from 'lucide-react-native';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const { articles, loading, refresh, toggleBookmark, isBookmarked } = useNews();
  const [activeIndex, setActiveIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const handleShare = async (article: any) => {
    try {
      await Share.share({
        message: `${article.title} - Read more on AInformed`,
        url: article.url,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      if (event.velocityY < -500) {
        // Swipe up - go to next article
        if (activeIndex < articles.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
      } else if (event.velocityY > 500) {
        // Swipe down - go to previous article
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
      }
    });

  const handleBookmarkPress = (articleId: string) => {
    toggleBookmark(articleId);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [activeIndex]);

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1A365D" />
        <Text style={styles.loadingText}>Personalizing your news feed...</Text>
      </View>
    );
  }

  if (articles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No News Found</Text>
        <Text style={styles.emptySubtitle}>
          We couldn't find any news matching your preferences.
        </Text>
        <TouchableOpacity style={styles.refreshButton} onPress={refresh}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentArticle = articles[activeIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>AInformed</Text>
        <NewsFilters />
      </View>

      <GestureDetector gesture={panGesture}>
        <View style={styles.cardContainer}>
          <ScrollView
            ref={scrollRef}
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          >
            <Animated.View
              key={currentArticle.id}
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(400)}
            >
              <NewsCard article={currentArticle} onPress={() => router.push(`/news/${currentArticle.id}`)} />

              <View style={styles.actionBar}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleBookmarkPress(currentArticle.id)}
                >
                  {isBookmarked(currentArticle.id) ? (
                    <BookmarkCheck size={24} color="#10B981" />
                  ) : (
                    <Bookmark size={24} color="#4A5568" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleShare(currentArticle)}
                >
                  <Share2 size={24} color="#4A5568" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </View>
      </GestureDetector>

      <View style={styles.pagination}>
        <Text style={styles.paginationText}>
          {activeIndex + 1} of {articles.length}
        </Text>
      </View>
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
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  logo: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    color: '#1A365D',
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 12,
  },
  actionButton: {
    padding: 10,
  },
  pagination: {
    padding: 15,
    alignItems: 'center',
  },
  paginationText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#718096',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#4A5568',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  emptyTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    color: '#1A365D',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 30,
  },
  refreshButton: {
    backgroundColor: '#1A365D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  refreshButtonText: {
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    fontSize: 16,
  },
});