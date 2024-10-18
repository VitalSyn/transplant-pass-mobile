import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '@/src/Constants/Colors';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigationHandler } from '@/src/Hooks/navigation';

interface ScreenHeaderProps {
  title: string;
}

const ScreenHeader = ({ title }: ScreenHeaderProps) => {
  const navigate = useNavigationHandler();
  return (
    <LinearGradient
      colors={[Colors.default, Colors.green_gradiente]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <TouchableOpacity onPress={navigate.goBack}>
        <Icon name="arrow-back-outline" size={24} color={Colors.white} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 24 }} />
    </LinearGradient>
  );
};

export default ScreenHeader;
