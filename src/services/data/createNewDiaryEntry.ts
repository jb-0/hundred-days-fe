import firebase from 'firebase/app';
import { models } from '../../types';

export const createNewDiaryEntry = async (
  firebaseApp: firebase.app.App,
  entry: models.DiaryEntry,
): Promise<boolean> => {
  const db = firebaseApp.firestore();
  const cleanEmail = firebaseApp.auth().currentUser?.email?.toLowerCase();
  const timestamp = new Date();
  const entryDate = new Date(entry.date);

  try {
    if (!cleanEmail) throw Error('email undefined');

    const entryWithTimestamps: models.DiaryEntry = {
      ...entry,
      date: entryDate.toISOString(),
      createdAt: timestamp.toISOString(),
      lastUpdated: timestamp.toISOString(),
    };

    await db.collection('users').doc(cleanEmail).collection('entries').doc().set(entryWithTimestamps);

    return true;
  } catch (e) {
    return false;
  }
};
