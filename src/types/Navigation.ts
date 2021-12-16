import { StackNavigationProp } from '@react-navigation/stack';
import { models } from '.';

export type RootStackParamList = {
  landing: undefined;
  signIn: undefined;
  register: undefined;
  app: undefined;
  diaryEntry: { sender: 'create' | 'edit'; entry?: models.DiaryEntry };
  unverified: undefined;
};

export interface AppNavigationProps {
  landing: StackNavigationProp<RootStackParamList, 'landing'>;
  register: StackNavigationProp<RootStackParamList, 'register'>;
  signIn: StackNavigationProp<RootStackParamList, 'signIn'>;
  app: StackNavigationProp<RootStackParamList, 'app'>;
  diaryEntry: StackNavigationProp<RootStackParamList, 'diaryEntry'>;
}
