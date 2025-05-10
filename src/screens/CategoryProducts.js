import { getProductsCategory } from '../services/Api';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';
import ProductCard from '../components/ProductCard'; // component hiển thị 1 sản phẩm
import { getImageProduct } from '../ultils';

const CategoryProducts = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsCategory(categoryId);
        const data = res?.data?.data?.docs || [];
        console.log("dữ liệu sản phẩm", data);
        setProducts(data);
        
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const renderItem = ({ item }) => (
    <ProductCard
      key={item._id}
      name={item.name}
      price={item.price}
      isStock={item.is_stock}
      image={getImageProduct(item.image)} // phải import hàm này
      onPress={() => navigation.navigate('ProductDetail', {
        productId: item._id,
        productName: item.name, 
        productPrice: item.price,
        productImage: getImageProduct(item.image), // phải import hàm này
      })}
    />
  );
  

  return (
    <ScreenLayout navigation={navigation}>
      <Text style={styles.headerText}>Sản phẩm của "{categoryName}"</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#f27c1e" style={{ marginTop: 20 }} />
      ) : products.length === 0 ? (
        <Text style={styles.noProducts}>Không có sản phẩm nào trong danh mục này.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          numColumns={2}
          key={'_'}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row} // ✅ Thêm dòng này
        />
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  noProducts: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between', // Cách đều các cột
    marginBottom: 12,
  },
});

export default CategoryProducts;
