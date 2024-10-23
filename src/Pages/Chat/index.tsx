import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Linking,
} from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import styles from "./styles";
import images from "../../Constants/images";
import { getCurrentTime, processAudioMessage, sendChatMessage, startRecording, stopRecording } from "@/src/Services/chatGpt";
import Header from "@/src/Components/Header";
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import Colors from "@/src/Constants/Colors";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  audioUri?: string | undefined | null;
  time: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUri, setAudioUri] = useState<string | null | undefined>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentMessagePlaying, setCurrentMessagePlaying] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const soundRef = useRef<Audio.Sound | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: "Olá! Meu nome é Laura. Como posso ajudá-lo hoje?",
        sender: "bot",
        time: getCurrentTime()
      },
    ]);
  }, []);

  const simulateTyping = (text: string) => {
    setIsAnimating(true); // Inicia o efeito de digitação
    let index = 0;
    let botMessage = "";
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        botMessage += text[index];
        index++;
        // Atualiza a última mensagem do bot em tempo real
        setMessages((prevMessages) =>
          prevMessages.map((msg, idx) =>
            msg.sender === "bot" && idx === prevMessages.length - 1
              ? { ...msg, text: botMessage }
              : msg
          )
        );
      } else {
        clearInterval(typingInterval);
        setIsAnimating(false); // Termina o efeito de digitação
      }
    }, 50); // Atraso de 50ms entre cada letra
  };

  const handleStartRecording = async () => {
    try {
      await startRecording();
      setIsRecording(true);
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      Alert.alert("Erro", "Não foi possível iniciar a gravação.");
    }
  };

  const handleStopRecording = async () => {
    if (isRecording) {
      try {
        const filePath = await stopRecording();
        setIsRecording(false);
        setAudioUri(filePath);
        await handleSend(filePath)
      } catch (error) {
        console.error("Erro ao parar gravação:", error);
        Alert.alert("Erro", "Não foi possível finalizar a gravação.");
      }
    }
  };

  const loadAndPlayAudio = async (uri: string) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      soundRef.current = sound;
      setSound(sound);
      setIsPlaying(true);
      setCurrentMessagePlaying(uri);

      sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
      const status = await sound.getStatusAsync();
      // setDuration(status.durationMillis || 0);
    } catch (error) {
      console.error("Erro ao carregar e reproduzir áudio", error);
    }
  };

  const updatePlaybackStatus = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);

      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
        setCurrentMessagePlaying(null);
        clearInterval(intervalRef.current!);
      } else if (isPlaying) {
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            setPosition((prev) => prev + 100); // Atualiza a posição a cada 100 ms
          }, 100);
        }
      } else {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }
  };

  const handlePlayPause = (uri: string) => {
    if (isPlaying && currentMessagePlaying === uri) {
      soundRef.current?.pauseAsync();
      setIsPlaying(false);
      clearInterval(intervalRef.current!);
    } else {
      loadAndPlayAudio(uri);
    }
  };

  const handleSend = async (filePath?: string) => {
    if (input.trim() === "" && !audioUri) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      audioUri,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAudioUri(null);

    if (filePath || audioUri) {
      const result = await processAudioMessage(filePath ? filePath : audioUri);
      const botMessage: Message = {
        id: Date.now().toString(),
        text: input.trim(),
        sender: "bot",
        audioUri: result?.audioGpt,
        time: getCurrentTime()
      };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      const response = await sendChatMessage(input);
      const botMessage: Message = {
        id: Date.now().toString(),
        text: '',
        sender: "bot",
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMessage]);
      simulateTyping(response);
    }

    setInput("");
    setAudioUri(null);
  };

  const handleCall = () => {
    const phoneNumber = '+5582993286918';
    Linking.openURL(`tel:${phoneNumber}`).catch(err => console.error("Erro ao tentar ligar: ", err));
  };

  const rightComponent = (
    <TouchableOpacity onPress={handleCall} style={{ padding: 10 }}>
      <FontAwesomeIcon name="phone-volume" size={25} color={Colors.white} />
      {/* <Icon name="call" size={30} color={Colors.white} /> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="LAURA-IA"
        titleIcon={
          <Image source={images.AvatarTereza} style={{ width: 50, height: 50 }} />
        }
        rightComponent={rightComponent}
      />
      <ImageBackground
        source={images.Frame}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.inner}
            behavior="padding"
            keyboardVerticalOffset={105}
          >
            <ScrollView
              contentContainerStyle={styles.messagesContainer}
              keyboardShouldPersistTaps="handled"
            >
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageRow,
                    message.sender === "user"
                      ? styles.userRow
                      : styles.botRow,
                  ]}
                >

                  <View
                    style={[
                      styles.messageBubble,
                      message.sender === "user"
                        ? styles.userBubble
                        : styles.botBubble,
                    ]}
                  >
                    {message.text ? (
                      <Text style={styles.messageText}>
                        {message.text}
                      </Text>
                    ) : (
                      message.audioUri && (
                        <View style={styles.audioContainer}>
                          <TouchableOpacity
                            onPress={() => handlePlayPause(message.audioUri!)}
                            style={styles.playPauseButton}
                          >
                            <Text style={styles.playPauseText}>
                              {isPlaying && currentMessagePlaying === message.audioUri
                                ? "⏸️"
                                : "▶️"}
                            </Text>
                          </TouchableOpacity>

                          {currentMessagePlaying === message.audioUri && (
                            <>
                              <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={duration}
                                value={position}
                                minimumTrackTintColor="#34b7f1"
                                maximumTrackTintColor="#000000"
                                thumbTintColor="#34b7f1"
                                onSlidingComplete={async (value) => {
                                  if (soundRef.current) {
                                    await soundRef.current.setPositionAsync(value);
                                    setPosition(value);
                                  }
                                }}
                              />
                              <Text style={styles.timeText}>
                                {Math.floor(position / 1000)}s / {Math.floor(duration / 1000)}s
                              </Text>
                            </>
                          )}
                        </View>
                      )
                    )}
                  </View>
                  <Text>{message.time}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Digite uma mensagem"
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
                <Text style={styles.sendButtonText}>Enviar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.audioButton}
                onPressIn={handleStartRecording}
                onPressOut={handleStopRecording}
              >
                <Text style={styles.recordButtonText}>
                  {isRecording ? "🔴" : "🎤"}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </SafeAreaView>
  );
}

