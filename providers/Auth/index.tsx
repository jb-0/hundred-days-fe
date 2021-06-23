import * as React from 'react';

const AuthContext = React.createContext<boolean>(true);

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  return context;
};

const AuthProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={true}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
