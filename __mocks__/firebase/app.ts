const app = {
  apps: { length: 0 },
  initializeApp: () => {
    return {
      auth: () => {
        return {
          signInWithEmailAndPassword: (email: string, password: string) => {
            return new Promise((resolve, reject) => {
              resolve({ email, password });
            });
          },
          createUserWithEmailAndPassword: (email: string, password: string) => {
            return new Promise((resolve, reject) => {
              resolve({
                user: {
                  sendEmailVerification: () => Promise.resolve(true),
                },
              });
            });
          },
        };
      },
    };
  },
};

export default app;
