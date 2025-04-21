// src/screens/Products.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Products = () => {
  return (
    <View style={styles.container}>
      <Text>Product List</Text>
      {/* List your products here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
});

export default Products;
