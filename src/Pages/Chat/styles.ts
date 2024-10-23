import { StyleSheet } from "react-native";
import Colors from "../../Constants/Colors";

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.default,
  },
  backgroundImage: {
    backgroundColor: "#e5ddd5",
    flex: 1,
    resizeMode: "cover", // Cobrir toda a área de fundo
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },
  messagesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  messageRow: {
    flexDirection: "column",
    marginVertical: 5,
    marginTop: 15
  },
  userRow: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  botRow: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 15,
    borderRadius: 30,
  },
  userBubble: {
    backgroundColor: "#DCF8C6", // Verde claro (estilo do WhatsApp)
    alignSelf: "flex-end",
    borderBottomRightRadius: 0
  },
  botBubble: {
    backgroundColor: "#FFF", // Bolha do bot em branco
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0
  },
  messageText: {
    fontSize: 14,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: Colors.default,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: Colors.background_button,
    borderWidth: 1,
    backgroundColor: "#f1f1f1",
    marginRight: 10,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green_light,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sendButtonText: {
    fontWeight: "bold",
    padding: 3
  },
  audioButton: {
    backgroundColor: Colors.green_light,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  recordButtonText: {
    fontSize: 20,
    color: '#FFF',
  },
  audioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  playPauseButton: {
    marginRight: 10,
  },
  playPauseText: {
    fontSize: 24,
  },
  slider: {
    width: 200,
    height: 40,
  },
  timeText: {
    fontSize: 12,
    color: "#555",
  },

});

export default styles;
