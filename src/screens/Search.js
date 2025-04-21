import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';  // Import ScreenLayout
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for search icon
const categories = {
  Android: ['Samsung', 'Xiaomi', 'Realme', 'OPPO', 'Vivo'],
  iPhone: ['iPhone 14', 'iPhone 13', 'iPhone 12', 'iPhone SE'],
  Accessories: ['Chargers', 'Cases', 'Screen Protectors', 'Earphones'],
};

const Search = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Android');
  const [searchText, setSearchText] = useState('');

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout navigation={navigation}>  
      {/* Search input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="What phone are you looking for?"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />

      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {Object.keys(categories).map(tab => (
          <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTab]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category list */}
      <FlatList
        data={categories[selectedTab]}
        keyExtractor={(item) => item}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.list}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 16, 
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
  },
    searchIcon: {
        position: 'absolute',
        right: 16,
        top: 9
    },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tabText: {
    fontSize: 16,
    color: '#555',
    paddingBottom: 6,
  },
  activeTab: {
    color: '#f27c1e',
    borderBottomWidth: 2,
    borderBottomColor: '#f27c1e',
    
  },
  list: {
    paddingHorizontal: 16,
  },
  item: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
});

export default Search;
