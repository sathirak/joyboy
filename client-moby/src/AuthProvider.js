import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  
  const [isAuth, setIsAuth] = useState(null);

  const fetchAuth = async () => {
    try {
      const response = await fetch('/hyperion/status', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setIsAuth(data.status);
    } catch (error) {
      console.error('Error fetching status:', error);
      setIsAuth(false);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  const authData = {
    isAuth,
    fetchAuth,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};
