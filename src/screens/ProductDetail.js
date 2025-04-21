import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import avt from '../../assets/images/avt_edit.jpg'; 

const { width } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }) => {
  const { productName, productPrice, productImage, productBrand } = route.params;

  const handleAddToCart = () => {
    console.log('Added to cart');
    navigation.navigate('MainTabs', { screen: 'Cart' }); // ✅ Sửa ở đây
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Top Image + Icons */}
        <View style={styles.topImageContainer}>
          <Image source={productImage} style={styles.mainImage} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}>
            <MaterialIcons name="shopping-cart" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Title + Price */}
        <View style={styles.detailHeader}>
          <View>
            <Text style={styles.title}>{productName}</Text>
            <Text style={styles.brand}>{productBrand}</Text>
          </View>
          <Text style={styles.price}>{productPrice}</Text>
        </View>

        {/* Thumbnails */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbContainer}>
          {[productImage, productImage, productImage].map((img, index) => (
            <Image key={index} source={img} style={styles.thumb} />
          ))}
        </ScrollView>

        {/* Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Info</Text>
          <Text style={styles.sectionText}>
            The {productName} features a high-quality design and advanced features to meet all your needs.
          </Text>
        </View>

        {/* Delivery & Return */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery and Return</Text>
          <Text style={styles.bullet}>🚚 Free shipping over $500</Text>
          <Text style={styles.bullet}>🔁 30 days return policy</Text>
          <Text style={styles.bullet}>🛡️ 1-year official warranty</Text>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
  <Text style={styles.sectionTitle}>Reviews</Text>
  <Text style={styles.stars}>⭐️⭐️⭐️⭐️⭐️</Text>

  {/* Review content */}
  <Text style={styles.review}>
    "The phone is fast, the screen is bright and smooth, and the battery life lasts me all day. Definitely worth the upgrade!"
  </Text>

  {/* Author name and avatar */}
  <View style={styles.authorContainer}>
    <Image source={avt} style={styles.authorAvatar} />
    <Text style={styles.authorName}>Nguyen Gia Huy</Text>
  </View>
</View>
      </ScrollView>

      {/* Add to Cart */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topImageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 500,
    padding: 20,
    paddingTop: 50,
    resizeMode: 'contain',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 30,
    elevation: 3,
  },
  cartBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#f27c1e',
    padding: 10,
    borderRadius: 30,
    elevation: 4,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 22, fontWeight: '700' },
  price: { fontSize: 20, fontWeight: 'bold', color: '#f27c1e' },
  brand: { fontSize: 14, color: '#777', marginTop: 4 },
  thumbContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  sectionText: { color: '#555', fontSize: 14, lineHeight: 20 },
  bullet: {
    color: '#333',
    fontSize: 14,
    marginBottom: 4,
  },
  stars: { fontSize: 16, marginBottom: 4 },
  review: { color: '#333', fontSize: 14, lineHeight: 20 },
  footer: {
    position: 'absolute',
    bottom: 0,
    width,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartBtn: {
    backgroundColor: '#f27c1e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  authorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  
});

export default ProductDetail;
