import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface CategoryListProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
}

export function CategoryList({ categories, onSelectCategory }: CategoryListProps) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => onSelectCategory(category)}
          >
            <Text style={styles.categoryIcon}>
              {category.icon || categoryIcons[category.id] || '📰'}
            </Text>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: 80,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
    backgroundColor: '#F7FAFC',
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  categoryName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: '#4A5568',
    textAlign: 'center',
  },
});