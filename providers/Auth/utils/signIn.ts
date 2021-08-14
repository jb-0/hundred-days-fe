import firebase from 'firebase/app';

export const signIn = (
  firebase: firebase.app.App,
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential | false> => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        resolve(userCredential);
      })
      .catch((error) => {
        reject(false);
      });
  });
};
