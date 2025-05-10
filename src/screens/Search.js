import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { getCategories } from '../services/Api';

const Search = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        const categoryList = data?.data?.docs || [];
        setCategories(categoryList);
        setFilteredCategories(categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchText, categories]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      navigation.navigate('CategoryProducts', { categoryId: item._id, categoryName: item.name });
    }}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout navigation={navigation}>
      {filteredCategories.length > 0 ? (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item._id}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.noResult}>
          <Text style={styles.noResultText}>No categories found.</Text>
        </View>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
  item: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
  noResult: {
    marginTop: 20,
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 16,
    color: '#888',
  },
});

export default Search;
