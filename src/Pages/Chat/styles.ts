import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fundo da tela do chat
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userMessageContainer: {
    backgroundColor: '#DCF8C6', // Cor do balão de mensagem do usuário
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: 'flex-end', // Alinha à direita (mensagem do usuário)
    maxWidth: '80%',
  },
  userMessageText: {
    color: '#000', // Cor do texto da mensagem
    fontSize: 16,
  },
  botMessageContainer: {
    backgroundColor: '#ECECEC', // Cor do balão de mensagem do bot
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: 'flex-start', // Alinha à esquerda (mensagem do bot)
    maxWidth: '80%',
  },
  botMessageText: {
    color: '#000', // Cor do texto da mensagem do bot
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF', // Fundo da área de input
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#ECECEC', // Fundo do campo de entrada
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    color: '#000', // Cor do texto da entrada
  },
  sendButton: {
    backgroundColor: '#126B43', // Cor do botão de enviar
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFFFFF', // Cor do texto do título
    fontSize: 18,
    fontWeight: 'bold',
  },
});
