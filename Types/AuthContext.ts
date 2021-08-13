import firebase from 'firebase/app';

export interface IAuthContext {
  firebaseApp?: firebase.app.App;
  createUser: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
}
