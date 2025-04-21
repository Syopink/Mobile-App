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


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        {/* <Stack.Screen name="MainTabs" component={MainDrawer} /> */}

        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
