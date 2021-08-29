import React from 'react';
import { ThemeProvider, AuthProvider } from './providers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types/Navigation';
import Router from './router';

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}
