import * as React from 'react';
import {
  createUser,
  signInWithEmail,
  signInWithCredential,
  getAsyncStoreUserCredential,
  setAsyncStoreUserCredential,
  firebaseConfig,
} from './utils';
import { IAuthContext } from '../../Types/AuthContext';
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthContext = React.createContext<IAuthContext>({
  createUser: () => Promise.reject(false),
  signIn: () => Promise.reject(false),
  userCredential: undefined,
  isAuthenticated: false,
  isVerified: false,
});

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

const AuthProvider: React.FC = ({ children }) => {
  const firebaseApp = (() => {
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig);
    } else {
      return firebase.app();
    }
  })();

  const [userCredential, setUserCredential] = React.useState<undefined | firebase.auth.UserCredential>();

  // On initial load, try to get get existing user from async store
  React.useEffect(() => {
    (async () => {
      const storedUserCredential = await getAsyncStoreUserCredential();

      if (storedUserCredential) {
        const refreshedCredential = await signInWithCredential(firebaseApp, storedUserCredential);
        refreshedCredential && setUserCredential(storedUserCredential);
      }
    })();
  }, []);

  const context: IAuthContext = {
    firebaseApp,
    userCredential,
    isAuthenticated: userCredential ? true : false,
    isVerified: userCredential?.user?.emailVerified === true ? true : false,
    createUser: async (email, password) => {
      try {
        const result = await createUser(firebaseApp, email, password);
        return result;
      } catch {
        return false;
      }
    },
    signIn: async (email, password) => {
      try {
        const result = await signInWithEmail(firebaseApp, email, password);
        if (result) {
          await setAsyncStoreUserCredential(result);
          setUserCredential(result);
        }
        return result;
      } catch {
        return false;
      }
    },
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
