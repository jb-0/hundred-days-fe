import * as React from 'react';
import { createUser, signIn, getAsyncStoreUserCredential, setAsyncStoreUserCredential, firebaseConfig } from './utils';
import { IAuthContext } from '../../Types/AuthContext';
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthContext = React.createContext<IAuthContext>({
  createUser: () => Promise.reject(false),
  signIn: () => Promise.reject(false),
  userCredential: undefined,
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
      storedUserCredential && setUserCredential(storedUserCredential);
    })();
  }, []);

  const context: IAuthContext = {
    firebaseApp,
    userCredential,
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
        const result = await signIn(firebaseApp, email, password);
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
