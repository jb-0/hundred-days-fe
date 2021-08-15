import firebase from 'firebase/app';

export const signInWithEmail = (
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

export const signInWithCredential = (
  firebase: firebase.app.App,
  { credential }: firebase.auth.UserCredential,
): Promise<firebase.auth.UserCredential | false> => {
  return new Promise((resolve, reject) => {
    if (credential) {
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((userCredential) => {
          resolve(userCredential);
        })
        .catch((error) => {
          reject(false);
        });
    }
  });
};
