import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ name, price, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    width: 160,            // Set width để card có kích thước cố định
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: '#fff', // Thêm màu nền để dễ nhìn
    borderRadius: 8,
    paddingVertical: 10,    // Thêm padding trên dưới
    shadowColor: '#000',    // Thêm bóng đổ cho card
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,           // Đảm bảo bóng đổ hiển thị trên Android
  },
  image: {
    width: '100%',         // Chiếm hết chiều ngang của card
    height: 130,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  price: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,          // Đảm bảo giá có kích thước hợp lý
  },
  name: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },
});


export default ProductCard;
