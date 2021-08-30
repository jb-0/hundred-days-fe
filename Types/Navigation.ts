import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  landing: undefined;
  signIn: undefined;
  register: undefined;
  home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

export interface AppNavigationProps {
  landing: StackNavigationProp<RootStackParamList, 'landing'>;
}
