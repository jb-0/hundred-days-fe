import firebase from 'firebase/app';
import { models } from '../../types';

type FirebaseWhere =
  | {
      fieldPath: string | firebase.firestore.FieldPath;
      opStr: firebase.firestore.WhereFilterOp;
      value: any;
    }
  | undefined;

export const getDiaryEntries = async (
  firebaseApp: firebase.app.App,
  where: FirebaseWhere = undefined,
): Promise<false | models.Diary['entries']> => {
  const db = firebaseApp.firestore();
  const cleanEmail = firebaseApp.auth().currentUser?.email?.toLowerCase();
  const results: models.Diary['entries'] = [];

  try {
    if (!cleanEmail) throw Error('email undefined');

    const entriesDocRef = db.collection('users').doc(cleanEmail).collection('entries');

    const refWithOptionalWhere = where ? entriesDocRef.where(where.fieldPath, where.opStr, where.value) : entriesDocRef;

    await refWithOptionalWhere
      .limit(200)
      .orderBy('date', 'desc')
      .get()
      .then((docs) => {
        docs.docs.forEach((doc) => results.push({ ...(doc.data() as models.DiaryEntry), id: doc.id }));
      })
      .catch(() => {
        return false;
      });

    return results;
  } catch (e) {
    return false;
  }
};
