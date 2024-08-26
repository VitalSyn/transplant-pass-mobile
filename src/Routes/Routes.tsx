import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../Constants/Colors';
import Initial from '../Pages/Initial';
import Splash from '../Pages/SplashScreen';
import Login from '../Pages/Login';
import AuthContext from '../Context/AuthContext';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from '../Pages/Chat';
import Calendar from '../Pages/Calendar';
import Profile from '../Pages/Profile';
import Notifications from '../Pages/Notifications';
import Tragetory from '../Pages/Tragetory';
import Onboarding from '../Pages/Onboarding';
import Exams from '../Pages/Exams';

const Drawer = createDrawerNavigator();
const BottomTab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Exams" component={Exams} />
      <Stack.Screen name="Tragetory" component={Tragetory} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

function AuthStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
}

function BottomTabNavigation() {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeStackScreen"
      activeColor={Colors.default}
      inactiveColor="#7f8c8d"
      barStyle={{ backgroundColor: '#ffffff', height: 70, paddingBottom: 5 }}
      labeled={false} // Mostrar ou esconder labels
    >
      <BottomTab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <Icon name="chatbubbles-outline" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: 'Calendário',
          tabBarIcon: ({ color }) => (
            <Icon name="calendar-outline" color={color} size={24} />
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
      screenOptions={{ headerShown: false, }}
      initialRouteName="Splash"
    >
      {signed ? (
        <Stack.Screen name="DrawerStackScreen" component={DrawerStackScreen} />
      ) : (
        <Stack.Screen name="AuthStackScreen" component={AuthStackScreen} />
      )}
    </Stack.Navigator>
  );
}