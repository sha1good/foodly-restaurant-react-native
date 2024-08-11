import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './app/screens/LoginPage'

const Stack = createNativeStackNavigator();
import * as SplashScreen from 'expo-splash-screen';
import RegisterRestaurant from './app/screens/RestaurantReg';
import SignUp from './app/screens/SignUp';
import Submitdata from './app/screens/Submitdata';
import VerificationPage from './app/screens/VerificationPage';
import Home from './app/screens/home/Home';
import AddFoods from './app/screens/foods/AddFoods';
import Wallet from './app/screens/wallet/Wallet';
import Foods from './app/screens/foods/Foods';
import Deliveries from './app/screens/deliveries/Deliveries';
import Profile from './app/screens/Profile';
import { LoginStore, checkStatus } from './app/store';
import PendingRestaurant from './app/screens/PendingRestaurant';
import OrderDetails from './app/screens/orders/OrderDetails';
import Preparing from './app/screens/orders/Preparing';
import Waiting from './app/screens/orders/Waiting';
import Picked from './app/screens/orders/Picked';
import Delivered from './app/screens/orders/Delivered';
import Cancelled from './app/screens/orders/Cancelled';

export default function App() {
  const isLoggedIn = LoginStore
  const [fontsLoaded, fontError] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="login" component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name="add-foods" component={AddFoods} options={{ headerShown: true, title: "Add Food", headerBackTitleVisible: false, }} />
      <Stack.Screen name="pending" component={PendingRestaurant} options={{ headerShown: false, title: "", headerBackTitleVisible: false, }} />

      <Stack.Screen name="food" component={Foods} options={{ headerShown: false, title: "", headerBackTitleVisible: false, }} />
      <Stack.Screen name="order-details" component={OrderDetails} options={{ headerShown: false, title: "", headerBackTitleVisible: false, }} />
      <Stack.Screen name="preparing" component={Preparing} options={{ headerShown: false, title: "", headerBackTitleVisible: false, }} />
      <Stack.Screen name="waiting" component={Waiting} options={{ headerShown: false, title: "", headerBackTitleVisible: false, }} />
      <Stack.Screen name="picked" component={Picked} options={{ headerShown: false, title: "", headerBackTitleVisible: false, }} />
      <Stack.Screen name="delivered" component={Delivered} options={{ headerShown: false, title: "", headerBackTitleVisible: false, }} />
      <Stack.Screen name="cancelled" component={Cancelled} options={{ headerShown: false, title: "", headerBackTitleVisible: false, }} />

      <Stack.Screen name="register" component={RegisterRestaurant} options={{ headerShown: false }} />

        <Stack.Screen name="home" component={Home} options={{ headerShown: false, headerBackTitleVisible: false, }} />
        <Stack.Screen name="wallet" component={Wallet} options={{ headerShown: true, title: "", headerBackTitleVisible: false, }} />
        <Stack.Screen name="deliveries" component={Deliveries} options={{ headerShown: true, title: "", headerBackTitleVisible: false, }} />
        <Stack.Screen name="submit" component={Submitdata} options={{ headerShown: false }} />
       
        <Stack.Screen name="signup" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="verification_page" component={VerificationPage} options={{ title: '', headerBackTitleVisible: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
