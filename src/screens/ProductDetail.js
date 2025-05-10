import React, { useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cart';
import { getImageProduct } from '../ultils';
import { getCommentsProduct, getProduct } from '../services/Api';

import { formatPrice } from '../lib/VndPrice';

const { width } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProduct(productId);
        setProduct(data.data);

        const commentRes = await getCommentsProduct(productId, {
          params: { limit: 4 },
        });
        setComments(commentRes.data.data.docs);
      } catch (err) {
        console.error('Lỗi khi lấy thông tin sản phẩm hoặc bình luận:', err);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = () => {
    if (!product || !product.is_stock) {  // Kiểm tra nếu không có sản phẩm hoặc hết hàng
      alert('Sản phẩm này đã hết hàng!');  // Hiển thị thông báo
      return;
    }    
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1,
    }));
    navigation.navigate('MainTabs', {
      screen: 'Trang chủ',
      params: {
        screen: 'Giỏ hàng',
      },
    });  };

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  const productImageUri = getImageProduct(product.image);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={styles.topImageContainer}>
          <Image source={{ uri: productImageUri }} style={styles.mainImage} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}>
            <MaterialIcons name="shopping-cart" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailHeader}>
          <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbContainer}>
          {[product.image, product.image, product.image].map((img, index) => (
            <Image key={index} source={{ uri: getImageProduct(img) }} style={styles.thumb} />
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin</Text>
          <Text style={styles.sectionText}>
            {`Sản phẩm ${product.name} ${product.details || ''}.`}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vận chuyển và Đổi trả</Text>
          <Text style={styles.bullet}>🚚 {product.accessories}</Text>
          <Text style={styles.bullet}>🔁 {product.status}</Text>
          <Text style={styles.bullet}>🛡️ {product.promotion}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đánh giá</Text>
          {comments.length === 0 ? (
            <Text style={styles.sectionText}>Chưa có đánh giá nào.</Text>
          ) : (
            comments.map((comment, index) => (
              <View key={index} style={{ marginBottom: 16 }}>
                <Text style={styles.stars}>⭐️⭐️⭐️⭐️⭐️</Text>
                <Text style={styles.review}>{comment.content}</Text>
                <View style={styles.authorContainer}>
                  <Image source={avt} style={styles.authorAvatar} />
                  <Text style={styles.authorName}>{comment.name || 'Ẩn danh'}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
  <TouchableOpacity
    style={[styles.addToCartBtn, !product.is_stock && { backgroundColor: '#ccc' }]}  // Đổi màu nút nếu hết hàng
    onPress={handleAddToCart}
    disabled={!product.is_stock}  // Disable nút nếu hết hàng
  >
    <Text style={styles.addToCartText}>
      {product.is_stock ? 'Thêm vào Giỏ hàng' : 'Hết hàng'}
    </Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f27c1e',
    flexShrink: 0,
    maxWidth: 150,
  },
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  sectionText: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
  },
  bullet: {
    color: '#333',
    fontSize: 14,
    marginBottom: 4,
  },
  stars: {
    fontSize: 16,
    marginBottom: 4,
  },
  review: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
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
});

export default ProductDetail;
