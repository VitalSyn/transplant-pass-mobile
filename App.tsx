import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './src/Context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes/Routes';
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
