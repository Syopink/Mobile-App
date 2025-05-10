import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cart';
const SuccessScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // Xóa giỏ hàng sau khi đặt hàng thành công
  const handleBackToHome = () => {
    dispatch(clearCart());
    navigation.navigate('MainTabs', {
      screen: 'Trang chủ',
      params: { screen: 'Home' },
    });
  }

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Ionicons name="checkmark-done-outline" size={100} color="#10B981" style={styles.icon} />
        <Text style={styles.title}>Đặt hàng thành công!</Text>
        <Text style={styles.message}>
          Cảm ơn bạn đã mua hàng. Bạn sẽ nhận được email xác nhận trong giây lát.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleBackToHome}
        >
          <Text style={styles.buttonText}>Quay lại trang chủ</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SuccessScreen;
