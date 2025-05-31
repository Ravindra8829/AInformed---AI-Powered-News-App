import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePreferences } from '@/hooks/usePreferences';
import { mockArticles } from '@/data/mockArticles';
import { generateId } from '@/utils/idGenerator';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  url: string;
}

interface NewsContextType {
  articles: NewsArticle[];
  loading: boolean;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  refresh: () => Promise<void>;
  getArticleById: (id: string) => Promise<NewsArticle | null>;
  getArticlesByCategory: (category: string) => Promise<NewsArticle[]>;
  searchNews: (query: string) => Promise<void>;
  searchResults: NewsArticle[];
  loadingSearch: boolean;
  bookmarkedArticles: NewsArticle[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  removeBookmark: (id: string) => void;
  clearAllBookmarks: () => void;
  categories: { id: string; name: string }[];
}

export const NewsContext = createContext<NewsContextType>({
  articles: [],
  loading: true,
  activeFilter: '',
  setActiveFilter: () => {},
  refresh: async () => {},
  getArticleById: async () => null,
  getArticlesByCategory: async () => [],
  searchNews: async () => {},
  searchResults: [],
  loadingSearch: false,
  bookmarkedArticles: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
  removeBookmark: () => {},
  clearAllBookmarks: () => {},
  categories: [],
});

interface NewsProviderProps {
  children: React.ReactNode;
}

export function NewsProvider({ children }: NewsProviderProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('');
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<NewsArticle[]>([]);
  const { preferences } = usePreferences();

  const categories = [
    { id: 'technology', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'politics', name: 'Politics' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'world', name: 'World News' },
    { id: 'food', name: 'Food' },
    { id: 'travel', name: 'Travel' },
  ];

  // Load bookmarks from AsyncStorage
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const bookmarksString = await AsyncStorage.getItem('bookmarks');
        if (bookmarksString) {
          setBookmarkedArticles(JSON.parse(bookmarksString));
        }
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    };

    loadBookmarks();
  }, []);

  // Load and filter articles based on preferences
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch articles from an API
        // For demo purposes, we're using mock data
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Filter articles based on user preferences if available
        let articlesToShow = [...mockArticles];
        
        if (preferences?.categories && preferences.categories.length > 0) {
          if (preferences.aiPersonalization) {
            // Simulate AI personalization by prioritizing preferred categories
            // and adding a random factor for variety
            articlesToShow.sort((a, b) => {
              const aInPreferences = preferences.categories.includes(a.category.toLowerCase()) ? 1 : 0;
              const bInPreferences = preferences.categories.includes(b.category.toLowerCase()) ? 1 : 0;
              const randomFactor = Math.random() * 0.3 - 0.15; // Add some randomness
              return (bInPreferences - aInPreferences) + randomFactor;
            });
          } else {
            // Without AI, just filter to preferred categories
            articlesToShow = articlesToShow.filter(article => 
              preferences.categories.includes(article.category.toLowerCase())
            );
          }
        }
        
        setArticles(articlesToShow);
        setFilteredArticles(articlesToShow);
      } catch (error) {
        console.error('Error loading articles:', error);
        setArticles([]);
        setFilteredArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [preferences]);

  // Apply category filter
  useEffect(() => {
    if (activeFilter) {
      const filtered = articles.filter(
        article => article.category.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [activeFilter, articles]);

  const refresh = async () => {
    setLoading(true);
    try {
      // In a real app, you would re-fetch articles from the API
      // For demo purposes, we'll just shuffle the existing articles
      const shuffled = [...mockArticles].sort(() => Math.random() - 0.5);
      setArticles(shuffled);
      
      if (activeFilter) {
        const filtered = shuffled.filter(
          article => article.category.toLowerCase() === activeFilter.toLowerCase()
        );
        setFilteredArticles(filtered);
      } else {
        setFilteredArticles(shuffled);
      }
    } catch (error) {
      console.error('Error refreshing articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const getArticleById = async (id: string): Promise<NewsArticle | null> => {
    // First check in filtered articles
    let article = filteredArticles.find(a => a.id === id);
    
    // If not found, check in all articles
    if (!article) {
      article = articles.find(a => a.id === id);
    }
    
    // If still not found, check in bookmarked articles
    if (!article) {
      article = bookmarkedArticles.find(a => a.id === id);
    }
    
    return article || null;
  };

  const getArticlesByCategory = async (category: string): Promise<NewsArticle[]> => {
    return articles.filter(
      article => article.category.toLowerCase() === category.toLowerCase()
    );
  };

  const searchNews = async (query: string) => {
    setLoadingSearch(true);
    try {
      // In a real app, you would query an API
      // For demo purposes, we'll search through our mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      const results = articles.filter(article => {
        const searchableText = `${article.title} ${article.content} ${article.summary} ${article.category} ${article.author}`.toLowerCase();
        return searchableText.includes(query.toLowerCase());
      });
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching news:', error);
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  const toggleBookmark = (id: string) => {
    const article = articles.find(a => a.id === id) || filteredArticles.find(a => a.id === id);
    if (!article) return;

    const isCurrentlyBookmarked = bookmarkedArticles.some(a => a.id === id);
    
    let updatedBookmarks;
    if (isCurrentlyBookmarked) {
      updatedBookmarks = bookmarkedArticles.filter(a => a.id !== id);
    } else {
      updatedBookmarks = [...bookmarkedArticles, article];
    }
    
    setBookmarkedArticles(updatedBookmarks);
    AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (id: string) => {
    return bookmarkedArticles.some(a => a.id === id);
  };

  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarkedArticles.filter(a => a.id !== id);
    setBookmarkedArticles(updatedBookmarks);
    AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  const clearAllBookmarks = () => {
    setBookmarkedArticles([]);
    AsyncStorage.removeItem('bookmarks');
  };

  return (
    <NewsContext.Provider
      value={{
        articles: filteredArticles,
        loading,
        activeFilter,
        setActiveFilter,
        refresh,
        getArticleById,
        getArticlesByCategory,
        searchNews,
        searchResults,
        loadingSearch,
        bookmarkedArticles,
        toggleBookmark,
        isBookmarked,
        removeBookmark,
        clearAllBookmarks,
        categories,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}