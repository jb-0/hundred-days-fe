import firebase from 'firebase/app';
import { models } from '../../types';

export const getDiaryEntries = async (firebaseApp: firebase.app.App): Promise<false | models.Diary['entries']> => {
  const db = firebaseApp.firestore();
  const cleanEmail = firebaseApp.auth().currentUser?.email?.toLowerCase();
  const results: models.Diary['entries'] = [];

  try {
    if (!cleanEmail) throw Error('email undefined');

    const entriesDocRef = db.collection('users').doc(cleanEmail).collection('entries');

    await entriesDocRef
      .orderBy('date', 'desc')
      .get()
      .then((docs) => {
        docs.docs.forEach((doc) => results.push(doc.data() as models.DiaryEntry));
      })
      .catch(() => {
        return false;
      });

    return results;
  } catch (e) {
    return false;
  }
};
