import firebase from 'firebase/app';
import { models } from '../../types';

export const getSingleDiaryEntry = async (
  firebaseApp: firebase.app.App,
  date: string,
): Promise<false | models.DiaryEntry> => {
  const db = firebaseApp.firestore();
  const cleanEmail = firebaseApp.auth().currentUser?.email?.toLowerCase();
  const results: models.Diary['entries'] = [];

  try {
    if (!cleanEmail) throw Error('email undefined');

    const entriesDocRef = db
      .collection('users')
      .doc(cleanEmail)
      .collection('entries')
      .where('date', '==', date)
      .limit(1);

    await entriesDocRef
      .get()
      .then((docs) => {
        docs.docs.forEach((doc) => results.push({ ...(doc.data() as models.DiaryEntry), id: doc.id }));
      })
      .catch(() => {
        return false;
      });

    if (results.length > 0) return results[0];
    else return false;
  } catch (e) {
    return false;
  }
};
