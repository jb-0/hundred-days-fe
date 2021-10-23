import React, { useState } from 'react';
import { createUser, signInWithEmail, signOut } from './utils';
import { IAuthContext } from '../../types/AuthContext';
import firebase from 'firebase/app';
import { useFirebase } from '../Firebase';

const AuthContext = React.createContext<IAuthContext>({
  createUser: () => Promise.reject(false),
  signIn: () => Promise.reject(false),
  signOut: () => Promise.reject(false),
  currentUser: undefined,
  isAuthenticated: false,
  isVerified: false,
  isPendingRefresh: false,
});

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

const AuthProvider: React.FC = ({ children }) => {
  const { firebaseApp } = useFirebase();
  const [currentUser, setCurrentUser] = useState<null | firebase.User>(null);
  const [pending, setPending] = useState(true);

  // On initial load, try to get existing user
  React.useEffect(() => {
    (async () => {
      firebaseApp.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
        setPending(false);
      });
    })();
  }, []);

  const context: IAuthContext = {
    currentUser: firebaseApp?.auth()?.currentUser || undefined,
    isAuthenticated: firebaseApp?.auth()?.currentUser ? true : false,
    isVerified: firebaseApp?.auth()?.currentUser?.emailVerified === true ? true : false,
    isPendingRefresh: pending,
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
        return result;
      } catch {
        return false;
      }
    },
    signOut: async () => {
      try {
        const result = await signOut(firebaseApp);
        return result;
      } catch {
        return false;
      }
    },
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
