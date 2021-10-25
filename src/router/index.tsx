import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../screens/public/Landing';
import SignIn from '../screens/public/SignIn';
import Register from '../screens/public/Register';

import Unverified from '../screens/private/Unverified';
import App from '../screens/private/App';

import { useAuth } from '../providers';

import { RootStackParamList } from '../types/Navigation';
import { headerOptions } from './utils';

const RootStack = createStackNavigator<RootStackParamList>();

const Router: React.FunctionComponent = () => {
  const { isAuthenticated, isVerified } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="landing">
        {isAuthenticated ? (
          <>
            {isVerified ? <RootStack.Screen name="app" component={App} options={{ title: 'App' }} /> : null}
            <RootStack.Screen name="unverified" component={Unverified} options={{ title: 'Verification Required' }} />
            <RootStack.Screen name="signIn" component={SignIn} options={headerOptions} />
            <RootStack.Screen name="register" component={Register} options={headerOptions} />
          </>
        ) : (
          <>
            <RootStack.Screen name="landing" component={Landing} options={{ title: 'Sign In / Register' }} />
            <RootStack.Screen name="signIn" component={SignIn} options={headerOptions} />
            <RootStack.Screen name="register" component={Register} options={headerOptions} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
