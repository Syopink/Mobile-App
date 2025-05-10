import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import ProductDetail from '../screens/ProductDetail';
import Home from '../screens/Home';
import MainTabs from './MainTabs'; // Sử dụng MainTabs trong DrawerNavigator
import CartScreen from '../screens/Cart';
import InfoScreen from '../screens/Info';
import DeliveryScreen from '../screens/Delivery';
import PaymentScreen from '../screens/Payment';
import SummaryScreen from '../screens/Summary';
import SuccessScreen from '../screens/Success';
import ProfileScreen from '../screens/Profile';
import CategoryProducts from '../screens/CategoryProducts';
import MyOrdersScreen from '../screens/MyOrder';
import SettingsScreen from '../screens/Setting';
import OrderDetailScreen from '../screens/OrderDetail';
import { ChangePasswordScreen, EditProfileScreen } from '../screens/ChangeInformation';
import DrawerNavigator from './MainDrawer'; // Đảm bảo import đúng
import PaymentInfo from '../screens/PaymentInfo';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} screenOptions={{gestureEnabled: false }} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="MainTabs" component={DrawerNavigator} screenOptions={{gestureEnabled: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Giỏ hàng" component={CartScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
        <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PaymentInfo" component={PaymentInfo} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="ChangeInformation" component={EditProfileScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
  );
};

export default StackNavigator;
