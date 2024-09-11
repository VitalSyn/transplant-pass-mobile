import React, { useState } from "react";
import { SafeAreaView, View, TextInput, FlatList, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";

export default function Chat() {
  const [message, setMessage] = useState(""); // Estado para armazenar a mensagem
  const [messages, setMessages] = useState<{ text: string }[]>([]); // Lista de mensagens do usuário

  // Função para adicionar mensagem do usuário
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message }]); // Adiciona mensagem do usuário
      setMessage(""); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Faixa superior com gradiente e ícones */}
      <LinearGradient colors={["#126B43", "#2C5342"]} style={styles.topBar}>
        <View style={styles.headerContainer}>
          <Icon name="arrow-back" size={24} color="#FFF" />
          <Text style={styles.title}>LAURA-IA</Text>
          <Icon name="info" size={24} color="#FFF" />
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.userMessageContainer}>
              <Text style={styles.userMessageText}>{item.text}</Text>
            </View>
          )}
          inverted={true} // Para exibir as mensagens de baixo para cima
          contentContainerStyle={styles.chatList}
        />

        {/* Caixa de entrada de mensagem */}
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Icon name="attach-file" size={24} color="#126B43" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Escreva aqui..."
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Icon name="send" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}