import React, { useContext, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, SafeAreaView, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import styles from './styles';
import { validateEmail, formataCPF, formataPhone, formataCEP } from "../../Utils";
import AuthContext from "../../Context/AuthContext";
import { useNavigationHandler } from "@/src/Hooks/navigation";
import { FloatingLabelInput } from "@/src/Components/FloatingInputLabel";
import { LoadingIndicator } from "@/src/Components/LoadingIndicator";

export default function Register() {
  const { createUser } = useContext(AuthContext)
  const navigate = useNavigationHandler();

  const [isSubmiting, setSubmiting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    phone: "",
    cep: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordConfirmed, setPasswordConfirmed] = useState(false)

  const [validation, setValidation] = useState({
    name: "",
    cpf: "",
    phone: "",
    cep: "",
    email: "",
    password: "",
    confirmPassword: "",
    msg: ""
  });

  async function onRegisterPress() {
    setSubmiting(true);
    let name = form.name.trim();
    let cpf = form.cpf.trim();
    let phone = form.phone.trim();
    let cep = form.cep.trim();
    let email = form.email.trim();
    let password = form.password.trim();

    let hasError = false;
    let validations: { [key: string]: string } = {};


    if (!name) {
      hasError = true;
      validations["name"] = "Campo obrigatório";
    };

    if (!cpf) {
      hasError = true;
      validations["cpf"] = "Campo obrigatório";
    };

    if (!phone) {
      hasError = true;
      validations["phone"] = "Campo obrigatório";
    };

    if (!cep) {
      hasError = true;
      validations["cep"] = "Campo obrigatório";
    };

    if (!password) {
      hasError = true;
      validations["password"] = "Campo obrigatório";
    };

    if (!confirmPassword) {
      hasError = true;
      validations["confirmPassword"] = "Campo obrigatório";
    } else {
      if (confirmPassword != password) {
        hasError = true
        setPasswordConfirmed(true)
      } else { setPasswordConfirmed(false) }
    }

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
        name: validations["name"] || "",
        cpf: validations["cpf"] || "",
        phone: validations["phone"] || "",
        cep: validations["cep"] || "",
        email: validations["email"] || "",
        password: validations["password"] || "",
        confirmPassword: validations["confirmPassword"] || "",
        msg: ""
      });
    }
    await createUser(
      form
    ).then((doc) => {
      if (doc) {
        setSubmiting(false);
        setForm({
          name: "",
          cpf: "",
          phone: "",
          cep: "",
          email: "",
          password: "",
        })

        // navigate("DrawerTabs");
      } else {
        setValidation({
          name: "",
          cpf: "",
          phone: "",
          cep: "",
          email: "",
          password: "",
          confirmPassword: "",
          msg: "Todos os campos são obrigatorios",
        });
        setSubmiting(false);
      }
    })
  }

  useEffect(() => {
    setValidation({
      name: "",
      cpf: "",
      phone: "",
      cep: "",
      email: "",
      password: "",
      confirmPassword: "",
      msg: "",
    })
  }, [form]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <KeyboardAvoidingView
          style={styles.scroll}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
          >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

          <View style={styles.containerFormLogin}>
            <View>
              <Text style={styles.h1}>Cadastro</Text>
            </View>

            <View style={!!validation?.name? styles.inputError : styles.input}>
              <FloatingLabelInput
                label="Nome Completo:"
                text={form.name}
                value={form.name}
                returnKeyType="next"
                autoCapitalize={"none"}
                keyboardType={"default"}
                onChangeText={(name: string) => setForm({ ...form, name })}
                />
            </View>

            <View style={!!validation?.cpf ? styles.inputError : styles.input}>
              <FloatingLabelInput
                label="CPF:"
                text={form.cpf}
                value={form.cpf}
                returnKeyType="next"
                autoCapitalize={"none"}
                keyboardType={"numeric"}
                maxLength={14}
                onChangeText={(cpf: string) => {
                  let numericCPF = cpf.replace(/[^0-9]/g, '');
                  setForm({ ...form, cpf: formataCPF(numericCPF) });
                }}
                />
            </View>

            <View style={!!validation?.phone ? styles.inputError : styles.input}>
              <FloatingLabelInput
                label="Telefone:"
                text={form.phone}
                value={form.phone}
                returnKeyType="next"
                autoCapitalize={"none"}
                keyboardType={"numeric"}
                maxLength={15}
                onChangeText={(phone: string) => {
                  let numericPhone = phone.replace(/[^0-9]/g, '');
                  setForm({ ...form, phone: formataPhone(numericPhone) });
                }}
                />
            </View>

            <View style={!!validation?.cep? styles.inputError : styles.input}>
              <FloatingLabelInput
                label="CEP:"
                text={form.cep}
                value={form.cep}
                returnKeyType="next"
                autoCapitalize={"none"}
                keyboardType={"numeric"}
                maxLength={9}
                onChangeText={(cep: string) => {
                  let numericCEP = cep.replace(/[^0-9]/g, '');
                  setForm({ ...form, cep: formataCEP(numericCEP) });
                }}
                />
            </View>

            <View style={!!validation?.email? styles.inputError : styles.input}>
              <FloatingLabelInput
                label="E-mail:"
                text={form.email}
                value={form.email}
                returnKeyType="next"
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                onChangeText={(email: string) => setForm({ ...form, email })}
                />
            </View>

            <View style={!!validation?.password ? styles.inputError : styles.input}>
              <FloatingLabelInput
                label="Senha:"
                secureText={true}
                text={form.password}
                value={form.password}
                returnKeyType="send"
                autoCapitalize={"none"}
                onChangeText={(password: string) => setForm({ ...form, password })}
                />
            </View>

            <View style={!!validation?.confirmPassword ? styles.inputError : styles.input}>
              <FloatingLabelInput
                label="Confirmação de senha:"
                secureText={true}
                text={confirmPassword}
                value={confirmPassword}
                returnKeyType="send"
                autoCapitalize={"none"}
                onChangeText={(confirmPassword: string) => setConfirmPassword(confirmPassword)}
                />
            </View>
            {passwordConfirmed && (
              <Text style={ { color: 'red' } }>A confirmação da senha está incorreta</Text>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              disabled={isSubmiting}
              onPress={onRegisterPress}
              
              >
              <LoadingIndicator isLoading={isSubmiting} />
              {!isSubmiting && <Text style={styles.submitText}>Cadastrar</Text>}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.seccondButton}
              onPress={() => navigate.navigate("Login")}
              >
              <Text style={styles.textFirst}>
                Já é cadastrado? 
                <Text style={styles.textSeccond}> Entre aqui</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};