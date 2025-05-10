import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { formatPrice } from '../lib/VndPrice';
import { order } from '../services/Api';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { payment } from '../services/Api';

const InfoScreen = ({ navigation }) => {
    const currentCustomer = useSelector(state => state.auth.login.currentCustomer);
    const items = useSelector(state => state.cart.items);
    const navigate = useNavigation();
    const [name, setName] = useState(currentCustomer?.fullName || '');
    const [phone, setPhone] = useState(currentCustomer?.phone || '');
    const [address, setAddress] = useState(currentCustomer?.address || '');
    const [addressList, setAddressList] = useState([
        ...(currentCustomer?.address ? [currentCustomer.address] : []),
        '123 Nguyễn Trãi, Quận 1',
        '45 Lê Lợi, Quận 3',
    ]);
    const [useInput, setUseInput] = useState(true); // Flag to toggle input mode

    const [deliveryMethod, setDeliveryMethod] = useState('Giao hàng tiêu chuẩn (3-5 ngày)');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const newItems = items.map((item) => ({
        prd_id: item._id,
        price: item.price,
        qty: item.qty,
    }));

    const handleSubmit = () => {
        if (items.length === 0) {
            alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
            return;
        }

        // Check if address is provided
        if (!address) {
            alert("Vui lòng nhập địa chỉ giao hàng.");
            return;
        }

        navigation.navigate("Summary", {address: address});
    };

    return (
        <ScreenLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Thông tin giao hàng</Text>

                <Text style={styles.label}>Họ và tên</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    editable={false}
                    onChangeText={setName}
                    placeholder="Nguyễn Văn A"
                />

                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="0123456789"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>
                    {useInput ? 'Nhập địa chỉ mới' : 'Chọn địa chỉ có sẵn'}
                </Text>

                {useInput ? (
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="123 Đường ABC, Quận XYZ"
                    />
                ) : (
                    <View style={styles.input}>
                        <RNPickerSelect
                            onValueChange={(value) => setAddress(value)}
                            value={address}
                            items={addressList.map(addr => ({ label: addr, value: addr }))}
                            placeholder={{ label: 'Chọn địa chỉ...', value: null }}
                            style={pickerSelectStyles}
                        />
                    </View>
                )}

                <TouchableOpacity onPress={() => setUseInput(!useInput)}>
                    <Text style={styles.toggleMode}>
                        {useInput ? 'Chọn địa chỉ có sẵn' : 'Tự nhập địa chỉ khác'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.title}>Tóm tắt đơn hàng</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sản phẩm</Text>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <View key={item._id || `${index}-${item.name}`} style={styles.itemRow}>
                                <Text style={styles.itemNameProduct}>{item.name}</Text>
                                <Text style={styles.itemNameProduct}>{item.qty}</Text>
                                <Text style={styles.itemPrice}>${formatPrice(item.price)}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.itemName}>Không có sản phẩm trong giỏ hàng</Text>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Phí giao hàng</Text>
                    <Text style={styles.itemName}>{deliveryMethod}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tổng cộng</Text>
                    {items.length > 0 ? (
                        <Text style={styles.total}>
                            {formatPrice(items.reduce((total, item) => total + item.price * item.qty, 0))}
                        </Text>
                    ) : (
                        <Text style={styles.itemName}>Không có sản phẩm trong giỏ hàng</Text>
                    )}
                </View>

                <Text style={styles.codNotice}>
                    Hiện tại chỉ hỗ trợ thanh toán khi nhận hàng (COD)
                </Text>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
        marginTop: 20,
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
        marginBottom: 16,
        fontSize: 16,
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
    itemNameProduct: {
        fontSize: 16,
        color: '#555',
        flexWrap: 'wrap',
        maxWidth: '50%',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '500',
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#f97316',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    toggleMode: {
        color: '#1e40af',
        fontWeight: '500',
        textAlign: 'right',
        marginBottom: 16,
    },
    codNotice: {
        color: '#dc2626',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        color: '#000',
        backgroundColor: '#f7f7f7',
        paddingRight: 30,
        marginBottom: 16,
        height: 50,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        color: '#000',
        backgroundColor: '#f7f7f7',
        paddingRight: 30,
        marginBottom: 16,
        height: 50,
    },
    placeholder: {
        color: '#aaa',
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
});

export default InfoScreen;
