import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  landing: undefined;
  signIn: undefined;
  register: undefined;
  app: undefined;
  unverified: undefined;
};

export interface AppNavigationProps {
  landing: StackNavigationProp<RootStackParamList, 'landing'>;
  register: StackNavigationProp<RootStackParamList, 'register'>;
  signIn: StackNavigationProp<RootStackParamList, 'signIn'>;
}
