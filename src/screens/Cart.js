import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addToCart, deleteItemCart, removeFromCart, updateCart } from '../redux/slices/cart';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { getImageProduct } from '../ultils';

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  console.log(items);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const formatPrice = (price) => {
    if (isNaN(price) || price < 0) {
      return "Giá không hợp lệ";
    }

    return Number(price).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  const changeQty = (id, name, action, qty) => {
    console.log('Thay đổi số lượng', { id, name, action, qty })
    if (action === 'decrement') {
      if (qty === 1) {
        Alert.alert(
          'Xác nhận',
          `Bạn có muốn xóa sản phẩm ${name} khỏi giỏ hàng không?`,
          [
            {
              text: 'Hủy',
              onPress: () => console.log('Đã hủy'),
              style: 'cancel',
            },
            {
              text: 'Xóa',
              onPress: () => dispatch(deleteItemCart({ _id: id })),
            },
          ],
          { cancelable: false }
        );
      } else {
        return dispatch(updateCart({
          _id: id,
          qty: qty - 1,
        }));
      }
    } else if (action === 'increment') {
      return dispatch(updateCart({
        _id: id,
        qty: qty + 1,
      }));
    }
  };

  return (
    <ScreenLayout navigation={navigation}>
      <FlatList
        data={items}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: getImageProduct(item.image) }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.sizeText}>{item.size}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                {formatPrice(item.price)}
              </Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => changeQty(item._id, item.name, 'decrement', item.qty)}
                >
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>{item.qty}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => changeQty(item._id, item.name, 'increment', item.qty)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => {
                    Alert.alert(
                      'Xác nhận',
                      `Bạn có muốn xóa sản phẩm ${item.name} khỏi giỏ hàng không?`,
                      [
                        { text: 'Hủy', style: 'cancel' },
                        { text: 'Xóa', onPress: () => dispatch(deleteItemCart({ _id: item._id })) },
                      ],
                      { cancelable: true }
                    );
                  }}
                >
                  <Ionicons name="trash-outline" size={28} color="#333" />
                </TouchableOpacity>

              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Tổng cộng</Text>
        <Text style={styles.totalValue}>{formatPrice(total)}</Text>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Info')}
      >
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  itemImage: {
    width: 100,
    height: 120,
    padding: 10,
    borderRadius: 12,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    position: 'relative',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 100,
    position: 'absolute',
    right: 10,
    bottom: 7,
  },
});
