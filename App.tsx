import React from 'react';
import { ThemeProvider } from './providers';
import Landing from './screens/public/Landing/Landing';

export default function App() {
  return (
    <ThemeProvider>
      <Landing />
    </ThemeProvider>
  );
}
