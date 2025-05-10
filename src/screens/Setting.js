// screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import ScreenLayout from '../components/Layout/ScreenLayout';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Cài đặt</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Thông báo</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Chế độ tối</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText} onPress={()=> navigation.navigate('ChangePassword')}>Đổi mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText} onPress={()=> navigation.navigate('ChangeInformation')}>Chỉnh sửa thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  settingButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsScreen;