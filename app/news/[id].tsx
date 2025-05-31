import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Share, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useNews } from '@/hooks/useNews';
import { ChevronLeft, Share2, Bookmark, BookmarkCheck } from 'lucide-react-native';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getArticleById, toggleBookmark, isBookmarked } = useNews();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        const fetchedArticle = await getArticleById(id.toString());
        setArticle(fetchedArticle);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleShare = async () => {
    if (article) {
      try {
        await Share.share({
          message: `${article.title} - Read more on AInformed`,
          url: article.url,
        });
      } catch (error) {
        console.error('Error sharing article:', error);
      }
    }
  };

  const handleBookmarkToggle = () => {
    if (article) {
      toggleBookmark(article.id);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1A365D" />
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Article not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color="#1A365D" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerButton} onPress={handleBookmarkToggle}>
                {isBookmarked(article.id) ? (
                  <BookmarkCheck size={24} color="#10B981" />
                ) : (
                  <Bookmark size={24} color="#4A5568" />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
                <Share2 size={24} color="#4A5568" />
              </TouchableOpacity>
            </View>
          ),
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.categoryRow}>
            <Text style={styles.category}>{article.category}</Text>
            <Text style={styles.date}>{article.publishedAt}</Text>
          </View>

          <Text style={styles.title}>{article.title}</Text>
          
          <Text style={styles.author}>By {article.author || 'Unknown'}</Text>
          
          {article.imageUrl && (
            <Image 
              source={{ uri: article.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          
          <Text style={styles.summary}>{article.summary}</Text>
          
          <Text style={styles.content}>{article.content}</Text>

          <TouchableOpacity 
            style={styles.sourceButton}
            onPress={() => {
              // In a real app, you would use Linking.openURL(article.url)
              console.log('Opening source URL:', article.url);
            }}
          >
            <Text style={styles.sourceButtonText}>Read Original Article</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
    padding: 5,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  category: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#10B981',
    backgroundColor: '#E6FFFA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#718096',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#1A365D',
    lineHeight: 32,
    marginBottom: 10,
  },
  author: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  summary: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1A365D',
  },
  content: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 30,
  },
  sourceButton: {
    padding: 15,
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  sourceButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#1A365D',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#1A365D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});