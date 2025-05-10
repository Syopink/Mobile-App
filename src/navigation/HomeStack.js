// navigation/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ gestureEnabled: false }} // Đảm bảo vô hiệu hóa kéo ngang ở đây

      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetail} 
        options={{
          gestureEnabled: false,  // Vô hiệu hóa kéo ngang trong ProductDetail
        }} 
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
