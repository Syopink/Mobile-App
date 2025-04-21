import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';

const SuccessScreen = ({ navigation }) => {
  return (
    <ScreenLayout>
      <View style={styles.container}>
      <Ionicons name="checkmark-done-outline" size={100} color="#10B981" style={styles.icon} />
      <Text style={styles.title}>Order Successful!</Text>
        <Text style={styles.message}>
          Thank you for your purchase. You will receive a confirmation email shortly.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.buttonText}>Back to Home</Text>
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 16,
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
