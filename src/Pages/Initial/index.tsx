import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { useNavigationHandler } from "@/src/Hooks/navigation";
import images from "@/src/Constants/images";
import styles from "./styles";

export default function Initial() {
  const navigate = useNavigationHandler();
  const [email, setEmail] = useState<string>('')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={images.Logo} style={styles.img} />
        <Text style={styles.firstText}>
          <Text style={{ fontWeight: 'bold' }}>Transplant
          </Text> Pass
        </Text>
      </View>

      <View>
        <Text style={styles.secondText}>Lorem ipsum dolor sit amet,
          consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigate.navigate("Login")}
      >
        <Text style={styles.textLogin}>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.seccondButton}
        onPress={() => navigate.navigate("Register")}
      >
        <Text style={styles.textSeccondButton}>Cadastro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};