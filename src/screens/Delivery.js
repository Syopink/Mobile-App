import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';
const DeliveryScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 'standard', label: 'Standard Delivery (3-5 days)' },
    { id: 'express', label: 'Express Delivery (1-2 days)' },
    { id: 'nextday', label: 'Next Day Delivery' },
  ];

  const handleNext = () => {
    navigation.navigate('Payment');
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        <Text style={styles.title}>Delivery Options</Text>

        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedOption === option.id && styles.optionSelected,
            ]}
            onPress={() => setSelectedOption(option.id)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option.id && styles.optionTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Continue to Payment</Text>
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
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  optionSelected: {
    borderColor: '#f97316',
    backgroundColor: '#fff7ed',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: '#f97316',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f97316',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DeliveryScreen;
