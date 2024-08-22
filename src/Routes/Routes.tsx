import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../Constants/Colors';
import images from '../Constants/images';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import AuthContext from '../Context/AuthContext';

const Drawer = createDrawerNavigator();
const BottomTab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function AuthStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function BottomTabNavigation() {
  function focusedColor(focused: boolean) {
    return focused ? Colors.default : 'gray';
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

function DrawerStackScreen() {
  return (
    <Drawer.Navigator initialRouteName="HomeTabs" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeTabs" component={BottomTabNavigation} />
    </Drawer.Navigator>)
}

export default function Routes() {
  const { signed } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      {signed ? (
        <Stack.Screen name="DrawerStackScreen" component={DrawerStackScreen} />
      ) : (
        <Stack.Screen name="AuthStackScreen" component={AuthStackScreen} />
      )}
    </Stack.Navigator>
  );
}
