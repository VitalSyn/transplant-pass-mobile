import Colors from "@/src/Constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
    marginBottom: "10%",
    width: "100%"
  },
  firstText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    color: Colors.default,
  },
  submitButton: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    marginTop: 30,
    borderRadius: 30,
    backgroundColor: Colors.default,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
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
  viewTablet: {
    width: '50%',
    alignSelf: 'center'
  },
  submitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
  validation: {
    paddingLeft: 20,
    marginBottom: -10,
    marginTop: -10,
    color: Colors.text_error,
  },
  seccondButton: {
    flexDirection: 'row',
    borderRadius: 30,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.default,
  },
  textSeccondButton: {
    margin: 5,
    fontWeight: '700',
    fontSize: 18,
    color: Colors.default,
  },
});
