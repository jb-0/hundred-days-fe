const app = {
  apps: { length: 0 },
  initializeApp: () => {
    return {
      auth: (mockMode: 'verified' | 'unverified' | undefined = 'unverified') => {
        return {
          signInWithEmailAndPassword: (email: string, password: string) => {
            return new Promise((resolve, reject) => {
              if (email === 'baduser@email.com') reject(false);
              else resolve(true);
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
          currentUser: (() => {
            if (!mockMode) return undefined;
            else if (mockMode === 'verified') {
              return {
                emailVerified: true,
              };
            } else if (mockMode === 'unverified') {
              return {
                emailVerified: false,
              };
            }
          })(),
        };
      },
      firestore: () => {
        return {
          collection: (collection: string) => {
            return {
              doc: (email: string) => {
                return {
                  set: (record: string) => {
                    return new Promise((resolve, reject) => {
                      // if (email === 'baduser@email.com') reject(false);
                      resolve(true);
                    });
                  },
                };
              },
            };
          },
        };
      },
    };
  },
};

export default app;
