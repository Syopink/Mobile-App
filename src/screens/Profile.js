import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Thư viện icon phổ biến
import ScreenLayout from '../components/Layout/ScreenLayout';

import avt from '../../assets/images/avt_edit.jpg';

const ProfileScreen = ({ navigation }) => {
  const options = [
    'My Orders',
    'My Returns',
    'Payment Information',
    'Settings',
  ];

  return (
    <ScreenLayout navigation={navigation}>
      <View style={styles.container}>
        {/* Avatar + Tên người dùng */}
        <View style={styles.profileHeader}>
          <Image
            source={avt}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Nguyen Gia Huy</Text>
        </View>

        {/* Danh sách các mục */}
        {options.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>
        ))}
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
});

export default ProfileScreen;
