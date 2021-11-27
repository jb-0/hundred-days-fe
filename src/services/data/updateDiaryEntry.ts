import firebase from 'firebase/app';
import { models } from '../../types';

export const updateDiaryEntry = async (
  firebaseApp: firebase.app.App,
  { freeText, tags, id = undefined }: models.DiaryEntry,
): Promise<boolean> => {
  const db = firebaseApp.firestore();
  const cleanEmail = firebaseApp.auth().currentUser?.email?.toLowerCase();
  const timestamp = new Date();

  try {
    if (!cleanEmail) throw Error('email undefined');
    if (!id) throw Error('no id provided');

    const entryWithTimestamps: Partial<models.DiaryEntry> = {
      freeText,
      tags,
      lastUpdated: timestamp.toISOString(),
    };

    await db.collection('users').doc(cleanEmail).collection('entries').doc(id).update(entryWithTimestamps);

    return true;
  } catch (e) {
    return false;
  }
};
