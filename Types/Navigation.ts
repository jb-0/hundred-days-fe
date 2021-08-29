export type RootStackParamList = {
  landing: undefined;
  signIn: undefined;
  register: undefined;
  home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};
