import Colors from "@/src/Constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  seccondButton: {
    height: 45,
    width: '60%',
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
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
