import React from 'react';
import { ThemeProvider, AuthProvider } from './providers';
import Router from './router';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}
