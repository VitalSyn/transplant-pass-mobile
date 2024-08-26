import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../Constants/Colors';
import images from '../Constants/images';
import Initial from '../Pages/Initial';
import Login from '../Pages/Login';
import AuthContext from '../Context/AuthContext';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import Onboarding from '../Pages/Onboarding';

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
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function BottomTabNavigation() {
  function focusedColor(focused: boolean): string {
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
  try {
    const { signed } = useContext(AuthContext);

    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Initial"
      >
        {signed ? (
          <Stack.Screen name="DrawerStackScreen" component={DrawerStackScreen} />
        ) : (
          <Stack.Screen name="AuthStackScreen" component={AuthStackScreen} />
        )}
      </Stack.Navigator>
    );
  } catch (error) {
    console.error("Erro nas rotas principais:", error);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ocorreu um erro ao carregar as rotas.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
