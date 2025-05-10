
// screens/MyOrdersScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { useSelector } from 'react-redux';
import { getOrdersCustomer } from '../services/Api';
import { formatPrice } from '../lib/VndPrice';
import { useNavigation } from '@react-navigation/native';

const MyOrdersScreen = () => {
  const currentCustomer = useSelector(state => state.auth.login.currentCustomer);
  const [orders, setOrders] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    if (currentCustomer?._id) {
        getOrdersCustomer(currentCustomer._id).then(({ data }) => {
        setOrders(data.orders || []);
      });
    }
  }, [currentCustomer]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}
    onPress={() => navigation.navigate('OrderDetail', { orderId: item._id })}
    >
      <Text style={styles.cardTitle}>Mã đơn: {item._id}</Text>
      <Text style={styles.cardText}>Tổng tiền: {formatPrice(item.totalPrice)}</Text>
      <Text style={styles.cardText}>Số sản phẩm: {item.items.length}</Text>
      <Text style={styles.cardText}>Trạng thái: {item.status === 0 ? 'Bị hủy' : 'Thành công'}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Đơn hàng của bạn</Text>
        <FlatList
          data={orders}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>Chưa có đơn hàng nào</Text>}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default MyOrdersScreen;