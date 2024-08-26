import Colors from "@/src/Constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  initialText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.default
  },

  backgroundButtonInformation: {
    backgroundColor: Colors.background_button,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: 40,
    height: 40,
    marginRight: 5
  },

  exitButton: {
    height: 45,
    width: '70%',
    alignItems: "center",
    justifyContent: "center",
    margin: 'auto',
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: Colors.buttonRed,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 4,
  },
  submitText: {
    fontSize: 20,
    color: Colors.white,
  },

});
