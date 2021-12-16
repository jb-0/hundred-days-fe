import firebase from 'firebase/app';

export const signInWithEmail = (
  firebase: firebase.app.App,
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential | false> => {
  const cleanEmail = email?.toLowerCase();

  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(cleanEmail, password)
      .then((userCredential) => {
        resolve(userCredential);
      })
      .catch((error) => {
        reject(false);
      });
  });
};
