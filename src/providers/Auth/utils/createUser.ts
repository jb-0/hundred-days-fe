import firebase from 'firebase/app';

export const createUser = (firebase: firebase.app.App, email: string, password: string): Promise<boolean> => {
  const cleanEmail = email?.toString();

  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(cleanEmail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user?.sendEmailVerification().then(() => {
          resolve(true);
        });
      })
      .catch((error) => {
        reject(false);
      });
  });
};
