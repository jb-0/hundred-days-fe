export type RootStackParamList = {
  landing: undefined;
  signIn: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};
