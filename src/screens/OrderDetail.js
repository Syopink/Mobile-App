import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { getOrderCustomer } from '../services/Api';
import { formatPrice } from '../lib/VndPrice';
const OrderDetailScreen = ({ route }) => {
  const { orderId } = route.params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    getOrderCustomer(orderId).then(({ data }) => {
      setItems(data.newItems || []);
    });
  }, [orderId]);

  
  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Chi tiết đơn hàng</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>Số lượng: {item.qty}</Text>
            <Text style={styles.detail}>Giá: {formatPrice(item.price)}</Text>
          </View>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default OrderDetailScreen;
