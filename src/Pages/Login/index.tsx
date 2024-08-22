import React, { useContext, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import styles from "./styles";
import { validateEmail } from "../../Utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AuthContext from "../../Context/AuthContext";
import { useNavigationHandler } from "@/src/Hooks/navigation";
import { FloatingLabelInput } from "@/src/Components/FloatingInputLabel";
import { LoadingIndicator } from "@/src/Components/LoadingIndicator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type RootStackParamList = {
  BottomTab: undefined;
  SignUp: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BottomTab'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigationHandler();

  const [isSubmiting, setSubmiting] = useState(false);
  const [form, setForm] = useState({
    email: "admin@admin.com",
    password: "12345678",
  });

  const [validation, setValidation] = useState({
    email: "",
    password: "",
    msg: ""
  });

  async function onLoginPress() {
    setSubmiting(true);
    var email = form.email.trim();
    var password = form.password.trim();

    var hasError = false;
    var validations: { [key: string]: string } = {};


    if (!password) {
      hasError = true;
      validations["password"] = "Campo obrigatório";
    };

    if (!email) {
      hasError = true;
      validations["email"] = "Campo obrigatório";
    } else {
      if (!validateEmail(email)) {
        hasError = true;
        validations["email"] = "E-mail inválido";
      }
    }

    if (hasError) {
      setSubmiting(false);
      return setValidation({
        email: validations["email"] || "",
        password: validations["password"] || "",
        msg: ""
      });
    }
    await login(form.email, form.password).then((doc) => {
      if (doc) {
        setSubmiting(false);
        setForm({
          email: "",
          password: "",
        })
        // navigate("DrawerTabs");
      } else {
        setValidation({
          email: "",
          password: "",
          msg: "E-mail ou Senha inválido, tente novamente em alguns instantes",
        });
        setSubmiting(false);
      }
    })
  }

  useEffect(() => {
    setValidation({
      email: "",
      password: "",
      msg: ""
    })
  }, [form]);
  return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView style={styles.scroll}>

          <View style={ styles.containerFormLogin }>
            <View>
              <Text style={ styles.h1 }>Login</Text>
            </View>

            <View style={!!validation?.email ? styles.inputError : styles.input}>
              <FloatingLabelInput
                label="E-mail"
                text={form.email}
                value={form.email}
                returnKeyType="next"
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                onChangeText={(email: string) => setForm({ ...form, email })}
              />
            </View>

            {!validation?.email && (
              <Text style={styles.validation}>{validation?.email}</Text>
            )}

            <View style={!!validation?.password ? styles.inputError : styles.input}>
              <FloatingLabelInput
                label="Senha"
                secureText={true}
                text={form.password}
                value={form.password}
                returnKeyType="send"
                autoCapitalize={"none"}
                onChangeText={(password: string) => setForm({ ...form, password })}
              />
            </View>


            {!validation?.password && (
              <Text style={styles.validation}>{validation?.password}</Text>
            )}

            {!validation.msg && (
              <Text style={styles.validation}>{validation?.msg}</Text>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              disabled={isSubmiting}
              onPress={onLoginPress}

            >
              <LoadingIndicator isLoading={isSubmiting} />
              {!isSubmiting && <Text style={styles.submitText}>Entrar</Text>}
            </TouchableOpacity>

            <Text style={ styles.textFirst }>
              Ainda não é cadastrado?
            </Text>

            <TouchableOpacity
              style={styles.seccondButton}
              onPress={() => navigate.navigate("Register")}
            >
              <Text style={styles.textSeccond}>Cadastre-se agora</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAwareScrollView>
      </SafeAreaView>
  );
};