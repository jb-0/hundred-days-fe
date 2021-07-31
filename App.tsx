import React from 'react';
import { ThemeProvider, AuthProvider } from './providers';
import Landing from './screens/public/Landing';
import SignIn from './screens/public/SignIn';
import Register from './screens/public/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './Types/Navigation';

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="landing">
            <RootStack.Screen name="landing" component={Landing} options={{ title: 'Sign In / Register' }} />
            <RootStack.Screen name="signIn" component={SignIn} options={{ title: 'Sign In' }} />
            <RootStack.Screen name="register" component={Register} options={{ title: 'Register' }} />
          </RootStack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
