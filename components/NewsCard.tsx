import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface NewsCardProps {
  article: {
    id: string;
    title: string;
    summary: string;
    category: string;
    imageUrl: string;
    publishedAt: string;
    author: string;
  };
  onPress: () => void;
}

export function NewsCard({ article, onPress }: NewsCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {article.imageUrl && (
        <Image
          source={{ uri: article.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.contentContainer}>
        <View style={styles.categoryRow}>
          <Text style={styles.category}>{article.category}</Text>
          <Text style={styles.date}>{article.publishedAt}</Text>
        </View>
        
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.summary}>{article.summary}</Text>
        
        <Text style={styles.author}>By {article.author || 'Unknown'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: width * 0.6,
  },
  contentContainer: {
    padding: 15,
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
    fontSize: 20,
    color: '#1A365D',
    marginBottom: 10,
    lineHeight: 28,
  },
  summary: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 15,
    lineHeight: 24,
  },
  author: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#718096',
  },
});