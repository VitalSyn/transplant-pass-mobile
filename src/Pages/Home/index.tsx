import React, { useContext, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { useNavigationHandler } from "@/src/Hooks/navigation";
import { FloatingLabelInput } from "@/src/Components/FloatingInputLabel";
import { LoadingIndicator } from "@/src/Components/LoadingIndicator";
import images from "@/src/Constants/images";
import styles from "./styles";
import AuthContext from "@/src/Context/AuthContext";

export default function Home() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigationHandler();
  const [email, setEmail] = useState<string>('')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={images.Logo} style={{ width: 160, height: 80 }} />
        <Text style={styles.firstText}>Seja bem vindo ao Bill</Text>
      </View>

      <View style={styles.input}>
        <FloatingLabelInput
          label="E-mail"
          text={email}
          value={email}
          returnKeyType="next"
          autoCapitalize={"none"}
          keyboardType={"email-address"}
          onChangeText={(email: string) => setEmail(email)}
        />
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <LoadingIndicator isLoading={true} />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.seccondButton}
        onPress={() => navigate.navigate("Login")}
      >
        <Text style={styles.textSeccondButton}>Criar conta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};