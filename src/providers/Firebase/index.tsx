import * as React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from './utils/firebaseConfig';
import { IFirebaseContext } from '../../types/FirebaseContext';

const initialiseFirebase = (): firebase.app.App => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};

const FirebaseContext = React.createContext<IFirebaseContext>({
  firebaseApp: initialiseFirebase(),
});

export const useFirebase = () => {
  const context = React.useContext(FirebaseContext);
  return context;
};

const FirebaseProvider: React.FunctionComponent = ({ children }) => {
  const context: IFirebaseContext = {
    firebaseApp: initialiseFirebase(),
  };

  return <FirebaseContext.Provider value={context}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;
