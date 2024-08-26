import React, { useEffect, useRef } from 'react';
import { View, Image, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import images from "@/src/Constants/images";
import styles from './styles';
import { useNavigationHandler } from '@/src/Hooks/navigation';

export default function SplashScreen() {
  const navigate = useNavigationHandler();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      delay: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        delay: 3000,
        useNativeDriver: true,
      }).start(() => {
        navigate.navigate('Onboarding');
      });
    });
  }, [fadeAnim]);

  return (
    <LinearGradient
      colors={['#126B43', '#1da756']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.header,
          { opacity: fadeAnim, }
        ]}>
        <Image
          source={images.logoSplash}
          style={styles.img}
          resizeMode="contain"
        />
        <Text style={styles.firstText}>
          <Text style={{ fontWeight: 'bold' }}>Transplant
          </Text> Pass
        </Text>
      </Animated.View>
    </LinearGradient>

  );
}
