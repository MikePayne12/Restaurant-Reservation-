// C:\Users\Admin\RAUL\client\src\contexts\AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // Set the authorization header for all requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Fetch current user
        const response = await axios.get('/api/auth/me');
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load user:', err);
        
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        setError('Authentication failed. Please login again.');
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      
      const { token, user } = response.data;
      
      // Store token and user
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      return user;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.needsVerification) {
        throw { needsVerification: true, ...err };
      }
      throw err;
    }
  };
  
  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  };
  
  const logout = () => {
    // Remove token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user state
    setUser(null);
  };
  
  const forgotPassword = async (email) => {
    const response = await axios.post('/api/auth/forgot-password', { email });
    return response.data;
  };
  
  const resetPassword = async (token, password) => {
    const response = await axios.post('/api/auth/reset-password', { token, password });
    return response.data;
  };
  
  const resendVerification = async (email) => {
    const response = await axios.post('/api/auth/resend-verification', { email });
    return response.data;
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        resendVerification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};