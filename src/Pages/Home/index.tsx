import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '@/src/Context/AuthContext';
import { useNavigationHandler } from '@/src/Hooks/navigation';
import styles from './styles';

export default function Home() {
  const { user, signOutApp } = useContext(AuthContext);
  const navigate = useNavigationHandler();
  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.initialText}>Bem vindo {user?.name}</Text>

      <TouchableOpacity style={styles.exitButton} onPress={signOutApp}>
        <Text style={styles.submitText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}