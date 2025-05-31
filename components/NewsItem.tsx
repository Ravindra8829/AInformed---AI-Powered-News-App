import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';

interface NewsItemProps {
  article: {
    id: string;
    title: string;
    summary: string;
    category: string;
    imageUrl: string;
    publishedAt: string;
  };
  onPress: () => void;
  isEditing?: boolean;
  onDelete?: () => void;
}

export function NewsItem({ article, onPress, isEditing, onDelete }: NewsItemProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={isEditing ? 1 : 0.7}
    >
      <View style={styles.content}>
        <View style={styles.textContent}>
          <View style={styles.header}>
            <Text style={styles.category}>{article.category}</Text>
            <Text style={styles.date}>{article.publishedAt}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
          <Text style={styles.summary} numberOfLines={2}>{article.summary}</Text>
        </View>
        
        {article.imageUrl && (
          <Image
            source={{ uri: article.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>

      {isEditing && onDelete && (
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={onDelete}
        >
          <Trash2 size={18} color="#E53E3E" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
  },
  textContent: {
    flex: 1,
    marginRight: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: '#10B981',
    backgroundColor: '#E6FFFA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#A0AEC0',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 6,
    lineHeight: 22,
  },
  summary: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
    bottom: 15,
    padding: 5,
  },
});