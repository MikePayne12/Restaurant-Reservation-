// C:\Users\Admin\RAUL\client\src\components\ProtectedRoute.js

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      try {
        // Set the authorization header for all requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Verify token by fetching current user
        await axios.get('/api/auth/me');
        
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    
    verifyAuth();
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;