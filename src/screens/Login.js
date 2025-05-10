import React, { useState } from 'react';
import {
  View, TextInput, Text, StyleSheet,
  TouchableOpacity, Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFail } from '../redux/slices/auth';
import { loginCustomer } from '../services/Api';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons để sử dụng icon

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State để quản lý ẩn/hiện mật khẩu

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }
  
    if (!validateEmail(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ.');
      return;
    }
  
    try {
      const response = await loginCustomer({ email, password });
      dispatch(loginSuccess(response.data));
      console.log('Đăng nhập thành công:', response.data);
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs', params: { screen: 'Trang chủ' } }],
      });
    } catch (error) {
      dispatch(loginFail());
  
      // Lấy thông điệp lỗi từ API nếu có, nếu không thì thông báo lỗi chung
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại sau.';
      
      // Hiển thị thông báo lỗi cho người dùng
      Alert.alert('Lỗi Đăng Nhập', errorMessage);      
      
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword} // Thay đổi thuộc tính secureTextEntry theo trạng thái showPassword
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#888"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.bottomLink}>Chưa có tài khoản? <Text style={styles.link}>Đăng ký ngay</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: -37,
    transform: [{ translateY: -12 }],
  },
  forgotText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#f27c1e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomLink: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default Login;
