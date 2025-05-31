import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useNews } from '@/hooks/useNews';
import { NewsItem } from '@/components/NewsItem';
import { Trash2 } from 'lucide-react-native';

export default function BookmarksScreen() {
  const { bookmarkedArticles, removeBookmark, clearAllBookmarks } = useNews();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
        <Text style={styles.emptySubtitle}>
          Save articles to read them later, even offline
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
        {bookmarkedArticles.length > 0 && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'Done' : 'Edit'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {bookmarkedArticles.length > 0 && isEditing && (
        <TouchableOpacity
          style={styles.clearAllButton}
          onPress={clearAllBookmarks}
        >
          <Trash2 size={16} color="#E53E3E" />
          <Text style={styles.clearAllText}>Clear All Bookmarks</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={bookmarkedArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsItem
            article={item}
            onPress={() => !isEditing && router.push(`/news/${item.id}`)}
            isEditing={isEditing}
            onDelete={() => removeBookmark(item.id)}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          bookmarkedArticles.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={renderEmptyState}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: '#1A365D',
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  editButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#10B981',
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FEF2F2',
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  clearAllText: {
    fontFamily: 'Roboto-Medium',
    color: '#E53E3E',
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 0,
    paddingBottom: 20,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#2D3748',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
});