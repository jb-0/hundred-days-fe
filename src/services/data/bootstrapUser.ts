import firebase from 'firebase/app';
import { models } from '../../types';

export const bootstrapUser = async (firebaseApp: firebase.app.App): Promise<boolean> => {
  const db = firebaseApp.firestore();
  const cleanEmail = firebaseApp.auth().currentUser?.email?.toLowerCase();
  const timestamp = new Date();
  const timestampAtMidnight = new Date();
  timestampAtMidnight.setHours(0, 0, 0, 0);

  try {
    if (!cleanEmail) throw Error('email undefined');

    const newUserRecord: models.User = {
      email: cleanEmail,
      settings: { dateDisplayFormat: 'dd/mm/yyyy', preferredLanguage: 'en-GB' },
    };

    const sampleDiaryEntry: models.DiaryEntry = {
      date: timestampAtMidnight.toISOString(),
      createdAt: timestamp.toISOString(),
      lastUpdated: timestamp.toISOString(),
      freeText: 'Welcome to your diary! This is your first entry',
    };

    await db.collection('users').doc(cleanEmail).set(newUserRecord);
    await db.collection('users').doc(cleanEmail).collection('entries').doc().set(sampleDiaryEntry);

    return true;
  } catch (e) {
    return false;
  }
};
