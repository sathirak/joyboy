import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Method to set authentication status
  const setAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  useEffect(() => {
    // Function to fetch authentication status
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch('/hyperion/status');
        if (response.ok) {
          const data = await response.json();
          setAuthStatus(data.isAuthenticated);
          console.log(isAuthenticated); // Assuming the response returns { isAuthenticated: true/false }
        } else {
          // Handle error scenarios if needed
          console.error('Failed to fetch authentication status');
        }
      } catch (error) {
        console.error('Error fetching authentication status:', error);
      }
    };

    fetchAuthStatus(); // Call the function on component mount

    // You might want to add dependencies if you don't want this to run on every render
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
