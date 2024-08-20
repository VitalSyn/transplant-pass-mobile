import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageData = async (value: object) => {
  try {
    // const jsonValue = JSON.stringify(value);
    // await AsyncStorage.setItem('@user', jsonValue);
    console.log('teste')
  } catch (error) {
    console.error(error);
  }
};

export const getStorageData = async () => {
  try {
    // const jsonValue = await AsyncStorage.getItem('@user');
    // return jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log('teste')
  } catch (error) {
    console.error(error);
  }
};

export const removeStorageData = async () => {
  try {
    // await AsyncStorage.removeItem('@user');
    console.log('teste')
  } catch (error) {
    console.error(error);
  }
};