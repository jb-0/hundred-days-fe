import firebase from 'firebase/app';
import { models } from '../../types';

export const bootstrapUser = async (firebaseApp: firebase.app.App, email: string): Promise<boolean> => {
  const db = firebaseApp.firestore();
  const cleanEmail = email?.toLowerCase();

  try {
    const newUserRecord: models.NewUser = {
      email: cleanEmail,
      diary: { dateDisplayFormat: 'dd/mm/yyyy', entries: [] },
    };

    await db.collection('users').doc(cleanEmail).set(newUserRecord);
    return true;
  } catch (e) {
    return false;
  }
};
