import firebase from 'firebase/app';

export const signOut = (firebase: firebase.app.App): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
  });
};
