import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
// import { CHATGPT_API_KEY, GOOGLE_API_KEY } from 'react-native-dotenv';
import axios from 'axios';

let recording: Audio.Recording | null = null;

export async function startRecording(): Promise<void> {
  try {
    console.log('Requesting permissions..');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    console.log('Starting recording..');
    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    recording = newRecording;
    console.log('Recording started');
  } catch (err) {
    console.log('Failed to start recording', err);
    throw err;
  }
}

export async function stopRecording(): Promise<string> {
  if (!recording) {
    throw new Error('No active recording');
  }

  console.log('Stopping recording..');
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  console.log('Recording stopped and stored at', uri);

  // Convertendo para MP3 (nota: esta é uma simulação, pois expo-av não suporta diretamente MP3)
  const mp3Uri = `${FileSystem.documentDirectory}recording.mp3`;
  if (uri) {
    await FileSystem.copyAsync({
      from: uri,
      to: mp3Uri
    });

    recording = null;
  }
  return mp3Uri;
}

export async function transcribeAudio(audioPath: string): Promise<string | undefined> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(audioPath);
    if (!fileInfo.exists) {
      throw new Error('Arquivo de áudio não encontrado.');
    }

    const formData = new FormData();
    formData.append('file', {
      uri: audioPath,
      type: 'audio/mp3',
      name: 'audio.mp3',
    } as any);
    formData.append('model', 'whisper-1');
    formData.append('language', 'pt');

    // Função que faz a requisição usando Axios
    const fetchTranscription = async () => {
      const response = await axios.post(`https://api.openai.com/v1/audio/transcriptions`, formData, {
        headers: {
          "Authorization": `Bearer`,
          "Content-Type": "multipart/form-data", // Axios ajusta automaticamente o Content-Type para multipart/form-data
        },
      });

      return response.data.text;
    };

    // Promessa de timeout
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => {
        reject(new Error("A requisição demorou mais de 30 segundos."));
      }, 30000); // 30 segundos
    });

    // Usa Promise.race para competir entre a requisição e o timeout
    const result = await Promise.race([fetchTranscription(), timeoutPromise]);
    return result;
  } catch (error) {
    console.log("Erro ao transcrever áudio:", error);
    return 'Erro ao transcrever áudio.';
  }
}

export async function convertTextToSpeech(text: string): Promise<string> {
  try {
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=`,
      {
        input: { text },
        voice: { name: "pt-BR-Wavenet-A", languageCode: "pt-BR", ssmlGender: "FEMALE" }, // Configure o idioma e a voz
        audioConfig: { audioEncoding: "MP3" },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const audioContent = response.data.audioContent;
      const audioUri = FileSystem.documentDirectory + "response.mp3";
      await FileSystem.writeAsStringAsync(audioUri, audioContent, { encoding: FileSystem.EncodingType.Base64 });
      return audioUri;
    } else {
      throw new Error("Erro ao converter texto em fala.");
    }
  } catch (error) {
    console.log("Erro:", error);
    return "";
  }
}


export async function processAudioMessage(audioUri: string | null | undefined): Promise<{ audioGpt: string; textGpt: string } | undefined> {
  try {
    if (!audioUri) return
    console.log('1', audioUri)
    const transcript = await transcribeAudio(audioUri);
    console.log('2', transcript)
    const chatResponse = await sendChatMessage(transcript);
    console.log('3', chatResponse)
    const mensageToAudio = await convertTextToSpeech(chatResponse)
    console.log('4', mensageToAudio)
    return { audioGpt: mensageToAudio, textGpt: chatResponse };
  } catch (error) {
    console.log("Erro ao processar mensagem de áudio:", error);
    return
  }
}

export async function playAudio(audioUri: string) {
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: audioUri });
    await sound.playAsync();
  } catch (error) {
    console.log("Erro ao tocar áudio:", error);
  }
}

export async function sendChatMessage(message: string | undefined): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Você vai ser uma assistente virtual, chamada Laura, para tirar dúvidas de pacientes que estão na fila de transplante de fígado, ${message}`,
          },
        ],
        max_tokens: 150, // Ajuste conforme necessário
      },
      {
        headers: {
          Authorization: `Bearer`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data.choices[0].message.content; // Acessa o conteúdo da resposta do modelo
    } else {
      throw new Error(response.data.error?.message || "Erro na API");
    }
  } catch (error) {
    console.log("Error:", error);
    return "Desculpe, houve um erro ao processar sua solicitação.";
  }
}

export async function sendChat(message: string): Promise<string> {
  // Simulação de respostas com base nas escolhas do usuário
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("olá") || lowerMessage.includes("oi")) {
    return "Olá! Como posso te ajudar hoje?\n1. Saber mais sobre o produto\n2. Suporte técnico\n3. Falar com um atendente";
  }

  if (lowerMessage.includes("1")) {
    return "Aqui estão mais informações sobre o nosso produto: é um app para conectar pessoas com ecoturismo.\nO que você deseja?\n1. Ver preços\n2. Saber como funciona\n3. Falar com um atendente";
  }

  if (lowerMessage.includes("2")) {
    return "Você está com problemas técnicos? Por favor, descreva o problema para que eu possa te ajudar.";
  }

  if (lowerMessage.includes("3")) {
    return "Conectando você com um atendente... Por favor, aguarde um momento.";
  }

  return "Desculpe, não entendi sua mensagem. Por favor, escolha uma das opções acima.";
}

export const getCurrentTime = () => {
  const now = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Para formato 24h
    timeZone: 'America/Sao_Paulo', // Definir o fuso horário correto
  };
  return now.toLocaleTimeString('pt-BR', options);
};

