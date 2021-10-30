import firebase from 'firebase/app';
import { models } from '../../types';

export const bootstrapUser = async (firebaseApp: firebase.app.App, email: string): Promise<boolean> => {
  const db = firebaseApp.firestore();
  const cleanEmail = email?.toLowerCase();
  const timestamp = new Date();

  try {
    const newUserRecord: models.User = {
      email: cleanEmail,
      settings: { dateDisplayFormat: 'dd/mm/yyyy', preferredLanguage: 'en-GB' },
    };

    const sampleDiaryEntry: models.DiaryEntry = {
      date: timestamp.toDateString(),
      createdAt: timestamp,
      lastUpdated: timestamp,
      freeText: 'Welcome to your diary! This is your first entry',
    };

    await db.collection('users').doc(cleanEmail).set(newUserRecord);
    await db.collection('users').doc(cleanEmail).collection('entries').doc().set(sampleDiaryEntry);

    return true;
  } catch (e) {
    return false;
  }
};
