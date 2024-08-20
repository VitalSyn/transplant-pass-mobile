import Colors from "@/src/Constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.drawer
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: '8.4%',
    marginBottom: '10%',
    marginTop: '10%',
  },
  view: {
    borderBottomWidth: 1,
    borderColor: Colors.default,
    marginBottom: '10%',
    marginHorizontal: '8.4%',
  },
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10%',
  },
  containerView2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '14%',
  },
});
