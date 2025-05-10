import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  FlatList,
  ScrollView
} from 'react-native';
import { getImageProduct } from '../ultils';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { getProducts } from '../services/Api';
import Pagination from '../components/Layout/Pagination';
import { useSelector } from 'react-redux';
import { formatPrice } from '../lib/VndPrice';
import HomeBanner from '../components/Layout/Banner';

const Home = ({ navigation }) => {
  const [latestProducts, setLatestProducts] = useState([]); // Sản phẩm mới
  const [featuredProducts, setFeaturedProducts] = useState([]); // Sản phẩm nổi bật
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [pageLatest, setPageLatest] = useState(1);
  const [pageFeatured, setPageFeatured] = useState(1);
  const [pageSearch, setPageSearch] = useState(1); 

  const itemsPerPage = 4;

  const currentCustomer = useSelector(state => state.auth.login.currentCustomer);

  useEffect(() => {
    // Lấy sản phẩm nổi bật
    getProducts({
      params: {
        limit: 12,
        is_featured: true,
      }
    }).then(({ data }) => {
      setFeaturedProducts(data.data.docs);
      console.log("Sản phẩm nổi bật:", data.data.docs);
    }).catch(err => console.error("Lỗi lấy sản phẩm nổi bật:", err));

    // Lấy sản phẩm mới
    getProducts({
      params: {
        limit: 12,
      }
    }).then(({ data }) => {
      setLatestProducts(data.data.docs);
    }).catch(err => console.error("Lỗi lấy sản phẩm mới:", err));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const all = [...latestProducts, ...featuredProducts];
      const filtered = all.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setPageSearch(1);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, latestProducts, featuredProducts]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const renderProduct = ({ item }) => (
    <ProductCard
      name={item.name}
      id={item._id}
      price={formatPrice(item.price)}
      isStock={item.is_stock}
      image={getImageProduct(item.image)}
      onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
    />
  );

  const isSearching = searchQuery.trim() !== '';
  const hasFilteredProducts = filteredProducts.length > 0;

  const paginate = (data, page) =>
    data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <ScreenLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>
          Chào mừng trở lại,{"\n"}
          <Text style={styles.username}>{currentCustomer?.fullName}</Text>
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Bạn đang tìm điện thoại gì?"
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        </View>


        <View style={styles.banner}>
          <Text style={styles.bannerText}>Flash Sale{"\n"}Giảm đến 30%</Text>
        </View>

        <HomeBanner/>


        {!isSearching && (
          <>
            {/* Sản phẩm nổi bật */}
            <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
            <FlatList
              data={paginate(featuredProducts, pageFeatured)}
              renderItem={renderProduct}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.productRow}
              contentContainerStyle={{ gap: 12 }}
            />
            <Pagination
              currentPage={pageFeatured}
              setPage={setPageFeatured}
              totalItems={featuredProducts.length}
              itemsPerPage={itemsPerPage}
            />

            {/* Sản phẩm mới */}
            <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
            <FlatList
              data={paginate(latestProducts, pageLatest)}
              renderItem={renderProduct}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.productRow}
              contentContainerStyle={{ gap: 12 }}
            />
            <Pagination
              currentPage={pageLatest}
              setPage={setPageLatest}
              totalItems={latestProducts.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}

        {isSearching && (
          <>
            {hasFilteredProducts ? (
              <>
                <Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>
                <FlatList
                  data={paginate(filteredProducts, pageSearch)}
                  renderItem={renderProduct}
                  keyExtractor={(item) => item._id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.productRow}
                  contentContainerStyle={{ gap: 12 }}
                />
                <Pagination
                  currentPage={pageSearch}
                  setPage={setPageSearch}
                  totalItems={filteredProducts.length}
                  itemsPerPage={itemsPerPage}
                />
              </>
            ) : (
              <Text style={styles.noResultsText}>Không tìm thấy sản phẩm phù hợp.</Text>
            )}
          </>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
    marginTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 30,
  },
  username: {
    fontWeight: '700',
    fontSize: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  banner: {
    backgroundColor: '#f27c1e',
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  productRow: {
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  noResultsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default Home;
