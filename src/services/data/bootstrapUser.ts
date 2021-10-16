import firebase from 'firebase/app';
import { models } from '../../types';

export const bootstrapUser = async (firebaseApp: firebase.app.App, email: string): Promise<boolean> => {
  const db = firebaseApp.firestore();

  try {
    const newUserRecord: models.NewUser = {
      email: email,
      diary: { dateDisplayFormat: 'dd/mm/yyyy', entries: [] },
    };

    await db.collection('users').doc(email).set(newUserRecord);
    return true;
  } catch (e) {
    return false;
  }
};
