import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '@/src/Constants/Colors';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigationHandler } from '@/src/Hooks/navigation';

interface Props {
  title: string;
  titleIcon?: React.ReactNode; // Ícone opcional no título
  rightComponent?: React.ReactNode; // Componente ou botão opcional no lado direito
}

const Header = ({ title, titleIcon, rightComponent }: Props) => {
  const navigate = useNavigationHandler();

  return (
    <LinearGradient
      colors={[Colors.default, Colors.green_gradiente]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      {/* Botão para voltar */}
      <TouchableOpacity onPress={navigate.goBack}>
        <Icon name="chevron-back-outline" size={26} color={Colors.white} />
      </TouchableOpacity>

      {/* Título com ou sem ícone */}
      <View style={styles.titleContainer}>
        {titleIcon && <View style={styles.iconContainer}>{titleIcon}</View>}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* Componente/botão no lado direito */}
      {rightComponent ? (
        <View style={styles.rightComponentContainer}>{rightComponent}</View>
      ) : (
        <View style={{ width: 24 }} /> // Espaço vazio para manter o layout consistente
      )}
    </LinearGradient>
  );
};

export default Header;
