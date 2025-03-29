import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/api/auth/me');
        if (response.data) {
          setCurrentUser(response.data);
        }
      } catch (err) {
        console.log('User not authenticated');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    try {
      setError('');
      const response = await axios.post('/api/auth/login', credentials);
      setCurrentUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      const response = await axios.post('/api/auth/register', userData);
      setCurrentUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setCurrentUser(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Logout failed');
      throw err;
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}