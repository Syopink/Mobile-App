// navigation/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Trang chủ') iconName = 'home';
          else if (route.name === 'Danh mục') iconName = 'search';
          else if (route.name === 'Giỏ hàng') iconName = 'cart';
          else if (route.name === 'Thông tin') iconName = 'person';
          return <Ionicons name={iconName} size={18} color={color} />;
        },
        tabBarActiveTintColor: '#f27c1e',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Trang chủ" 
        component={HomeStack} 
        options={{
          gestureEnabled: false,  // Vô hiệu hóa kéo ngang trong HomeStack
        }} 
      />
      <Tab.Screen name="Danh mục" component={Search} />
      <Tab.Screen name="Giỏ hàng" component={Cart} />
      <Tab.Screen name="Thông tin" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainTabs;
