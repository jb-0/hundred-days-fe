export type RootStackParamList = {
  landing: undefined;
  signIn: undefined;
  register: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};
