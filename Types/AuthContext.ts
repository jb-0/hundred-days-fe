import firebase from 'firebase/app';

export interface IAuthContext {
  firebaseApp?: firebase.app.App;
  createUser: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<firebase.auth.UserCredential | false>;
  currentUser: undefined | firebase.User;
  isVerified: boolean;
  isAuthenticated: boolean;
  isPendingRefresh: boolean;
}
