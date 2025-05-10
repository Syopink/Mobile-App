// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import ProductDetail from './src/screens/ProductDetail';
import DeliveryScreen from './src/screens/Delivery';
import PaymentScreen from './src/screens/Payment';
import SummaryScreen from './src/screens/Summary';
import SuccessScreen from './src/screens/Success';
import ProfileScreen from './src/screens/Profile';
import MainTabs from './src/navigation/MainTabs'; 
import InfoScreen from './src/screens/Info';
import CartScreen from './src/screens/Cart';
import CategoryProducts from './src/screens/CategoryProducts';

import { Provider } from 'react-redux';
import store from './src/redux/store';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
