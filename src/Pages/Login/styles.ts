import Colors from "@/src/Constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5ecf7',
  },

  containerFormLogin: {

    width: '80%',
    height: '75%',
    borderRadius: 30,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  h1: {
    fontSize: 32,
    color: '#B5151C',
    margin: 30,
  },
  submitButton: {
    height: 45,
    width: '60%',
    alignItems: "center",
    justifyContent: "center",
    margin: 'auto',
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#B5151C',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 4,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    margin: 16,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    height: 56,
  },
  inputError: {
    paddingHorizontal: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: 8,
    height: 56,
  },

  submitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
  validation: {
    flex: 1,
    paddingLeft: 20,
    marginBottom: -10,
    marginTop: -10,
    color: Colors.text_error,
  },
  seccondButton: {
    marginBottom: 30,
  },
  textSeccondButton: {}
});
