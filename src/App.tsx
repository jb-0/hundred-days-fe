import React from 'react';
import Router from './router';
import { ThemeProvider, AuthProvider, initiateTranslations } from './providers';

initiateTranslations();

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}
