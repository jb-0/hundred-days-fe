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
          currentUser: {
            email: 'someuser@mail.com',
          },
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
                      limit: () => {
                        return {
                          orderBy: () => {
                            return {
                              get: () => {
                                return new Promise((resolve, reject) => {
                                  // if (email === 'baduser@email.com') reject(false);
                                  resolve({
                                    docs: [
                                      {
                                        id: 'LjY19hleO64q59oyXgGQ',
                                        data: () => {
                                          return {
                                            date: '2021-11-28T00:00:00.000Z',
                                            createdAt: '2021-11-28T00:00:00.000Z',
                                            lastUpdated: '2021-11-28T00:00:00.000Z',
                                            freeText: 'Some day description',
                                            tags: [],
                                          };
                                        },
                                      },
                                      {
                                        id: 'IjY19hleO64q59oyXgGQ',
                                        data: () => {
                                          return {
                                            date: '2021-11-29T00:00:00.000Z',
                                            createdAt: '2021-11-29T00:00:00.000Z',
                                            lastUpdated: '2021-11-29T00:00:00.000Z',
                                            freeText: '',
                                            tags: [],
                                          };
                                        },
                                      },
                                    ],
                                  });
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
          },
        };
      },
    };
  },
};

export default app;
