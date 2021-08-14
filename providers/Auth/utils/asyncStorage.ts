import firebase from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStoreUserCredential = async (userCredential: firebase.auth.UserCredential): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(userCredential);
    await AsyncStorage.setItem('@fb_user', jsonValue);
    return true;
  } catch (e) {
    return false;
  }
};

export const getAsyncStoreUserCredential = async (): Promise<firebase.auth.UserCredential | false> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@fb_user');
    const parsedValue: firebase.auth.UserCredential | false = jsonValue != null ? JSON.parse(jsonValue) : false;
    return parsedValue;
  } catch (e) {
    return false;
  }
};
