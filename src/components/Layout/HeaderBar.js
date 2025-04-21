// components/HeaderBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const HeaderBar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.topBar}>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert('Thông báo', 'Mở menu điều hướng');
                    navigation.openDrawer();
                }}
            >
                <Ionicons name="menu" size={28} color="#333" />
            </TouchableOpacity>

            {/* Sửa Text thành View để căn giữa đúng cách */}
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>VietProShop</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        position: 'relative',
        paddingHorizontal: 20,
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    logoContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 0, // đảm bảo không đè nút menu
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

});

export default HeaderBar;
