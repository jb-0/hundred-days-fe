import React from 'react';
import Router from './router';
import { AuthProvider, initiateTranslations, FirebaseProvider, ThemeProvider } from './providers';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Setting a timer', // getting crappy timer warnings from firebase so destroying them
  'Failed prop type: Invalid props.style key `tintColor` supplied to `Text`',
  'AsyncStorage has been extracted from react-native core', // another nice one, result of upgrading expo 👍
]);
initiateTranslations();

export default function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}
