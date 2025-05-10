import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { formatPrice } from '../lib/VndPrice';
import { order } from '../services/Api';

const SummaryScreen = ({ navigation, route }) => {
  // Fetch current user and cart details
  const currentCustomer = useSelector(state => state.auth.login.currentCustomer);
  const items = useSelector(state => state.cart.items);
  
  // Receive the dynamically updated address from InfoScreen
  const address = route.params?.address || currentCustomer.address;
  console.log(route)
  
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const newItems = items.map(item => ({
    prd_id: item._id,
    price: item.price,
    qty: item.qty,
  }));

  const handleConfirmOrder = () => {
    order({
      customer_id: currentCustomer._id,
      fullName: currentCustomer.fullName,
      email: currentCustomer.email,
      phone: currentCustomer.phone,
      address: address,  // Use the updated address here
      items: newItems,
    }).then(({ data }) => {
      if (data.status === 'success') {
        navigation.navigate('Success');
      }
    });
  };

  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Xác nhận đơn hàng</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin người nhận</Text>
          <Text style={styles.itemText}>👤 {currentCustomer.fullName}</Text>
          <Text style={styles.itemText}>📞 {currentCustomer.phone}</Text>
          <Text style={styles.itemText}>📍 {address || 'Chưa có địa chỉ'}</Text>
          </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức giao hàng</Text>
          <Text style={styles.itemText}>Giao hàng tiêu chuẩn (3-5 ngày)</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản phẩm</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQty}>x{item.qty}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tổng cộng</Text>
          <Text style={styles.total}>{formatPrice(total)}</Text>
        </View>
        <Text style={styles.codNotice}>
          Hiện tại chỉ hỗ trợ thanh toán khi nhận hàng (COD)
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
          <Text style={styles.buttonText}>Xác nhận và thanh toán</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemName: {
    width: '50%',
    fontSize: 16,
  },
  itemQty: {
    width: '10%',
    fontSize: 16,
    textAlign: 'center',
  },
  itemPrice: {
    width: '40%',
    fontSize: 16,
    textAlign: 'right',
    fontWeight: '500',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#f97316',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  codNotice: {
    color: '#dc2626', // Màu đỏ dịu
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
  },
  
});

export default SummaryScreen;
