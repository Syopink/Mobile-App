import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { registerCustomer } from '../services/Api'; // Import the registerCustomer function

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errorRegister, setErrorRegister] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hàm kiểm tra tính hợp lệ của email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Hàm kiểm tra tính hợp lệ của số điện thoại (10 chữ số)
  const validatePhone = (phone) => {
    const re = /^(0[3|5|7|8|9])([0-9]{8})$/;
    return re.test(phone);
  };

  // Hàm kiểm tra tính hợp lệ của mật khẩu
  const validatePassword = (password) => {
    // Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường và 1 số
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleSignUp = async () => {
    // Kiểm tra nếu các trường không hợp lệ
    if (!fullName || !email || !password || !phone || !address) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Kiểm tra tính hợp lệ của email
    if (!validateEmail(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }

    // Kiểm tra tính hợp lệ của số điện thoại
    if (!validatePhone(phone)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
      return;
    }

    // Kiểm tra tính hợp lệ của mật khẩu
    if (!validatePassword(password)) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái viết hoa, chữ cái viết thường và số');
      return;
    }

    try {
      setIsLoading(true);
      setErrorRegister('');

      // Gọi API đăng ký
      await registerCustomer({
        fullName,
        email,
        password,
        phone,
        address,
      });

      Alert.alert('Thành công', 'Đăng ký thành công! Vui lòng đăng nhập.');
      navigation.navigate('Login');
    } catch (err) {
      const response = err?.response;

      // Hiển thị lỗi khi đăng ký thất bại
      if (response?.data === 'Email exists') {
        setErrorRegister('Email đã tồn tại');
      } else if (response?.data === 'Phone Number Exists') {
        setErrorRegister('Số điện thoại đã tồn tại');
      } else {
        Alert.alert('Lỗi', 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký tài khoản</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        placeholderTextColor="#888"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        placeholderTextColor="#888"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        placeholderTextColor="#888"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errorRegister ? (
        <Text style={styles.errorText}>{errorRegister}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Đang xử lý...' : 'Đăng ký'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.bottomLink}>
          Đã có tài khoản? <Text style={styles.link}>Đăng nhập ngay</Text>
        </Text>
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
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

export default SignUp;
