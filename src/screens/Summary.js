import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SummaryScreen = ({ navigation }) => {
  const deliveryMethod = 'Express Delivery (1-2 days)';
  const total = 235.5 * 2;

  return (
    <ScreenLayout>
      <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        <Text style={styles.title}>Order Summary</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>Nokia 1 Red</Text>
            <Text style={styles.itemPrice}>$235.50</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>Nokia 6.1 Plus</Text>
            <Text style={styles.itemPrice}>$235.50</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery</Text>
          <Text style={styles.deliveryMethod}>{deliveryMethod}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total</Text>
          <Text style={styles.total}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Success')}>
          <Text style={styles.buttonText}>Confirm and Pay</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  backBtn: {
    position: 'absolute',
    top: -52,
    right: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 30,
    elevation: 3,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    color: '#555',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  deliveryMethod: {
    fontSize: 16,
    color: '#555',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
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
});

export default SummaryScreen;
