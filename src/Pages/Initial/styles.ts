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
    marginTop: "40%",
    width: "100%"
  },

  img: {
    width: '45%',
    height: '50%',
  },

  firstText: {
    fontSize: 35,
    color: '#156B4395',
    // fontFamily: 'Inter',
  },

  secondText: {
    width: '80%',
    fontSize: 12,
    textAlign: 'center',
    color: Colors.gray_tab,
    margin: 'auto',
    marginTop: 20,
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

  textLogin: {
    fontSize: 18,
    color: Colors.white,
  },

  seccondButton: {
    height: 45,
    width: '60%',
    alignItems: "center",
    justifyContent: "center",
    margin: 'auto',
    marginTop: -55,
    borderRadius: 30,
    backgroundColor: '#e5ecf7',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 4,
  },

  textSeccondButton: {
    margin: 5,
    fontWeight: '700',
    fontSize: 18,
    color: '#B5151C',
  },
});
