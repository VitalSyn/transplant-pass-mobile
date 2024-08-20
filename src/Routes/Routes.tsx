import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../Constants/Colors';
import images from '../Constants/images';
import Home from '../Pages/Home';
import Login from '../Pages/Login';

// Definindo o Drawer Navigator
const Drawer = createDrawerNavigator();

// Definindo o Bottom Tab Navigator
const BottomTab = createMaterialBottomTabNavigator();

// Definindo o Stack Navigator
const Stack = createNativeStackNavigator();

// Stack Navigator
function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function BottomTabNavigation() {
  function focusedColor(focused: boolean) {
    return focused ? Colors.default : 'gray'; // Example colors
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      activeColor={Colors.default}
      inactiveColor="gray"
      barStyle={{ backgroundColor: Colors.white, height: 70 }}
    >
      <BottomTab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{
          title: "Início",
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.Home}
              style={{
                width: 26,
                height: 26,
                tintColor: focusedColor(focused),
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Category"
        component={Login}
        options={{
          title: "Login",
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.Home}
              style={{
                width: 26,
                height: 26,
                tintColor: focusedColor(focused),
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={Home}
        options={{
          title: "Busca",
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.Home}
              style={{
                width: 26,
                height: 26,
                tintColor: focusedColor(focused),
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Sell"
        component={Home}
        options={{
          title: "Pedidos",
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.Home}
              style={{
                width: 26,
                height: 26,
                tintColor: focusedColor(focused),
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Home}
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.Home}
              style={{
                width: 26,
                height: 26,
                tintColor: focusedColor(focused),
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Drawer Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeTabs" screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="HomeTabs" component={BottomTabNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
