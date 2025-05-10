// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import ProfileScreen from '../screens/Profile';
import MyOrdersScreen from '../screens/MyOrder';
import SettingsScreen from '../screens/Setting';
import CartScreen from '../screens/Cart';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Trang chủ" component={MainTabs} />
      <Drawer.Screen name="Thông tin" component={ProfileScreen} />
      <Drawer.Screen name="Đơn hàng" component={MyOrdersScreen} />
      <Drawer.Screen name="Cài đặt" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
