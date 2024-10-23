import { StyleSheet } from 'react-native';
import Colors from "@/src/Constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_tab,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20
  },
  iconContainer: {
    marginRight: 8, // Espaço entre o ícone e o título
  },
  rightComponentContainer: {
    // Estilo para o componente à direita
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
