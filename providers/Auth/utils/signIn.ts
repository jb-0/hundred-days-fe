import firebase from 'firebase/app';

export const signIn = (firebase: firebase.app.App, email: string, password: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(false);
      });
  });
};
