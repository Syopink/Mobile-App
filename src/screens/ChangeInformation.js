// screens/ChangePasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { useSelector } from 'react-redux';

const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới không khớp');
      return;
    }

    // Gửi API đổi mật khẩu ở đây
    Alert.alert('Thành công', 'Đổi mật khẩu thành công');
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Đổi mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu cũ"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

// screens/EditProfileScreen.js
import axios from 'axios';
import { updateCustomer } from '../services/Api';
import { useDispatch } from 'react-redux';
import { updateSuccess } from '../redux/slices/auth';
const EditProfileScreen = () => {
  const currentCustomer = useSelector(state => state.auth.login.currentCustomer);
  const [fullName, setFullName] = useState(currentCustomer?.fullName || '');
  const [email, setEmail] = useState(currentCustomer?.email || '');
  const [phone, setPhone] = useState(currentCustomer?.phone || '');
  const [address, setAddress] = useState(currentCustomer?.address || '');
  const [loading, setLoading] = useState(false);  // Để quản lý trạng thái đang tải
  const dispatch = useDispatch(); // Dùng để dispatch action nếu cần
  const handleSave = async () => {
    if (!fullName || !phone || !address) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    setLoading(true); // Bắt đầu gửi request

    try {
      const data = { email, fullName, phone, address };
      const response = await updateCustomer(data);  // Gọi API để cập nhật thông tin
      console.log('Response:', data);
      if (response.status === 200) {
        dispatch(updateSuccess(data))
        Alert.alert('Thành công', 'Cập nhật thông tin cá nhân thành công');
      } else {
        Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật thông tin');
    } finally {
      setLoading(false); // Kết thúc gửi request
    }
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Chỉnh sửa thông tin</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={false} // Không cho phép chỉnh sửa email
        />
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
          disabled={loading} // Vô hiệu hóa nút khi đang tải
        >
          <Text style={styles.buttonText}>
            {loading ? 'Đang cập nhật...' : 'Lưu'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f97316',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export { ChangePasswordScreen, EditProfileScreen };