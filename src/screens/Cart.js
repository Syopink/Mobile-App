import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';

const cartItems = [
  {
    id: '1',
    name: 'Nokia 1 Red',
    price: 235.5,
    quantity: 1,
    size: 'L',
    image: require('../../assets/images/Nokia-1-red.png'), // Đổi sang ảnh local phù hợp
  },
  {
    id: '2',
    name: 'Nokia 6.1 Plus',
    price: 235.5,
    quantity: 1,
    size: '40',
    image: require('../../assets/images/Nokia-6.1-Plus-Blue.png'),
  },
];

export default function CartScreen({ navigation }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ScreenLayout navigation={navigation}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.sizeText}>{item.size}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.qtyBtn}>
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNumber}>{item.quantity}</Text>
                <TouchableOpacity style={styles.qtyBtn}>
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Info')}>
        <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  itemImage: {
    width: 100,
    height: 120,
    padding: 10,
    borderRadius: 12,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
