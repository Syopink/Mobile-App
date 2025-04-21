import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const InfoScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleNext = () => {
        // Bạn có thể lưu vào context hoặc truyền qua navigation nếu cần
        navigation.navigate('Delivery');
    };

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Your Info</Text>

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Shipping Address</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Enter your shipping address"
                />

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Continue to Delivery</Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        position: 'relative',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
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
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
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

export default InfoScreen;
