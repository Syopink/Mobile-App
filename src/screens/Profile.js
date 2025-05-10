import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import ScreenLayout from '../components/Layout/ScreenLayout';
import { CommonActions } from '@react-navigation/native';

import avt from '../../assets/images/avt_edit.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { loggedOut } from '../redux/slices/auth';

const ProfileScreen = ({ navigation }) => {
  const options = [
    'Đơn hàng của tôi',
    'Thông tin thanh toán',
    'Cài đặt',
  ];

  const currentCustomer = useSelector(state => state.auth.login.currentCustomer);
  const dispatch = useDispatch();

  // ✅ Xử lý đăng xuất - dùng reset để không quay lại được
  const handleLogout = () => {
    dispatch(loggedOut());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <ScreenLayout navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={avt} style={styles.profileImage} />
          <Text style={styles.profileName}>{currentCustomer?.fullName}</Text>
        </View>

        {options.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}
          onPress={() => {
            if (item === 'Đơn hàng của tôi') navigation.navigate('MyOrders');
            else if (item === 'Cài đặt') navigation.navigate('Settings');
            else if (item === 'Thông tin thanh toán') navigation.navigate('PaymentInfo');
          }}
          >
            <Text style={styles.cardText}>{item}</Text>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>
        ))}

        {/* Nút đăng xuất */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen;
