import Colors from "@/src/Constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  submitButton: {
    height: 45,
    width: '60%',
    alignItems: "center",
    justifyContent: "center",
    margin: 'auto',
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: Colors.buttonRed,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 4,
  },

  textSubmit: {
    fontSize: 18,
    color: Colors.white,
  },
  slide: {
    flex: 1,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    width: '80%'
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 30,
    width: '80%'
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 250,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    marginHorizontal: 8,
  },
});