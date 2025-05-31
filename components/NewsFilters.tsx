import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useNews } from '@/hooks/useNews';
import { Filter, X } from 'lucide-react-native';

export function NewsFilters() {
  const [modalVisible, setModalVisible] = useState(false);
  const { categories, activeFilter, setActiveFilter } = useNews();

  const handleFilterSelect = (filterId: string) => {
    setActiveFilter(filterId);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.filterTags}>
          {activeFilter ? (
            <TouchableOpacity
              style={styles.activeTag}
              onPress={() => handleFilterSelect('')}
            >
              <Text style={styles.activeTagText}>
                {categories.find(c => c.id === activeFilter)?.name || activeFilter}
              </Text>
              <X size={14} color="#1A365D" />
            </TouchableOpacity>
          ) : (
            <Text style={styles.filterText}>All News</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Filter size={20} color="#1A365D" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter News</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={[{ id: '', name: 'All News' }, ...categories]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.filterItem,
                    activeFilter === item.id && styles.activeFilterItem,
                  ]}
                  onPress={() => handleFilterSelect(item.id)}
                >
                  <Text
                    style={[
                      styles.filterItemText,
                      activeFilter === item.id && styles.activeFilterItemText,
                    ]}
                  >
                    {item.name}
                  </Text>
                  {activeFilter === item.id && (
                    <View style={styles.checkmark} />
                  )}
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.filtersList}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  filterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  activeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  activeTagText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#1A365D',
    marginRight: 5,
  },
  filterText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#1A365D',
  },
  filterButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  modalTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#2D3748',
  },
  closeButton: {
    padding: 5,
  },
  filtersList: {
    paddingVertical: 10,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  activeFilterItem: {
    backgroundColor: '#F7FAFC',
  },
  filterItemText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#4A5568',
  },
  activeFilterItemText: {
    color: '#1A365D',
  },
  checkmark: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
});