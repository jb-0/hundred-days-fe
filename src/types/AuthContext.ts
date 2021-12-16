import firebase from 'firebase/app';

export interface IAuthContext {
  createUser: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<firebase.auth.UserCredential | false>;
  signOut: () => Promise<boolean>;
  currentUser: undefined | firebase.User;
  isVerified: boolean;
  isAuthenticated: boolean;
  isPendingRefresh: boolean;
}
