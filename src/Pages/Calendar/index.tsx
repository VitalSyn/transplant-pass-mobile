import React from "react";
import { Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import { useNavigationHandler } from "@/src/Hooks/navigation";
import styles from "./styles";
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from "@/src/Constants/Colors";

export default function Calendar() {
  const navigate = useNavigationHandler();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="hammer-outline" size={100} color={Colors.default} />

        <Text>Tela de Calendário em construção</Text>

        <TouchableOpacity
          style={styles.seccondButton}
          onPress={() => navigate.goBack()}
        >
          <Text style={styles.textSeccondButton}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};