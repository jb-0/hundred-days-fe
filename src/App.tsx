import React from 'react';
import Router from './router';
import { ThemeProvider, AuthProvider, initiateTranslations, FirebaseProvider } from './providers';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']); // getting crappy timer warnings from firebase so destroying them
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
