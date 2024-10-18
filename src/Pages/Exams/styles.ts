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
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  filterContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray_tab,
    borderRadius: 8,
    padding: 10,
    height: 50,
    justifyContent: 'space-between',
  },
  dateText: {
    color: Colors.black,
    fontSize: 16,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: Colors.gray_tab,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: Colors.black,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray_tab,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    color: Colors.black,
  },
  searchButton: {
    marginRight: 5,
  },
  notificationList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationItem: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'space-between'
  },
  notificationDate: {
    fontSize: 14,
    color: Colors.gray,
  },
  notificationMessage: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default styles;
