import React from 'react';
import Router from './router';
import { ThemeProvider, AuthProvider, initiateTranslations, FirebaseProvider } from './providers';

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
