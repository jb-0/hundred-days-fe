import * as React from 'react';
import { IAuthContext } from '../../Types/AuthContext';
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthContext = React.createContext<IAuthContext>({ firebaseApp: undefined });

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  return context;
};

const AuthProvider: React.FC = ({ children }) => {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyCZ6Bfrh2qw5IzxuCeoVfw64eACkfF1uoc',
    authDomain: 'hundred-days-2ebe2.firebaseapp.com',
    projectId: 'hundred-days-2ebe2',
    storageBucket: 'hundred-days-2ebe2.appspot.com',
    messagingSenderId: '245846571840',
    appId: '1:245846571840:web:15ba8fcae7f6572f2c98a5',
    measurementId: 'G-Q695WEH53F',
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const context: IAuthContext = { firebaseApp };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
