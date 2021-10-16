import React, { useEffect } from 'react';
import { useAuth } from '../providers';
import Landing from '../screens/public/Landing';
import SignIn from '../screens/public/SignIn';
import Register from '../screens/public/Register';
import Home from '../screens/private/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';

const RootStack = createStackNavigator<RootStackParamList>();

const Router: React.FunctionComponent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="landing">
        {isAuthenticated ? (
          <>
            <RootStack.Screen name="signIn" component={SignIn} options={{ title: 'Sign In' }} />
            <RootStack.Screen name="register" component={Register} options={{ title: 'Register' }} />
            <RootStack.Screen name="home" component={Home} options={{ title: 'Home' }} />
          </>
        ) : (
          <>
            <RootStack.Screen name="landing" component={Landing} options={{ title: 'Sign In / Register' }} />
            <RootStack.Screen name="signIn" component={SignIn} options={{ title: 'Sign In' }} />
            <RootStack.Screen name="register" component={Register} options={{ title: 'Register' }} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
