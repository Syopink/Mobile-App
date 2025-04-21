  import React from 'react';
  import { createStackNavigator } from '@react-navigation/stack';
  import SignUp from '../screens/SignUp';
  import Login from '../screens/Login';
  import ProductDetail from '../screens/ProductDetail';
  import Home from '../screens/Home';

  const Stack = createStackNavigator();

  const StackNavigator = () => {
    return (
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    );
  };

  export default StackNavigator;
