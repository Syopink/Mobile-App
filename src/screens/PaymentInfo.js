import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';

const PaymentInfo = () => {
  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Phương thức thanh toán</Text>

        <Text style={styles.paragraph}>
          Hiện tại, chúng tôi chỉ hỗ trợ phương thức thanh toán khi nhận hàng (COD).
        </Text>

        <Text style={styles.paragraph}>
          Với hình thức này, bạn sẽ thanh toán tiền mặt hoặc chuyển khoản trực tiếp cho nhân viên giao hàng khi nhận được sản phẩm.
        </Text>

        <Text style={styles.sectionTitle}>Thanh toán online (sắp ra mắt)</Text>
        <Text style={styles.paragraph}>
          Chúng tôi đang trong quá trình tích hợp các phương thức thanh toán online như:
        </Text>
        <Text style={styles.bullet}>• Thẻ tín dụng / ghi nợ (Visa, Mastercard)</Text>
        <Text style={styles.bullet}>• Ví điện tử (Momo, ZaloPay)</Text>
        <Text style={styles.bullet}>• Cổng thanh toán Stripe</Text>

        <Text style={styles.note}>
          Khi các phương thức này sẵn sàng, bạn sẽ thấy chúng xuất hiện trong phần thanh toán.
        </Text>
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  bullet: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    marginBottom: 6,
  },
  note: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default PaymentInfo;
