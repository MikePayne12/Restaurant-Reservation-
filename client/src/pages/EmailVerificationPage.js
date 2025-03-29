// C:\Users\Admin\RAUL\client\src\pages\EmailVerificationPage.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmailVerificationPage() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyEmail = async () => {
      // Extract token from URL query params
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      
      if (!token) {
        setError('Invalid verification link. The token is missing.');
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`/api/auth/verify-email?token=${token}`);
        setSuccess(true);
        setLoading(false);
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setLoading(false);
        
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Failed to verify email. Please try again.');
        }
      }
    };
    
    verifyEmail();
  }, [location, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <h2 className="mt-6 text-center text-xl font-medium text-gray-900">
            Verifying your email...
          </h2>
        </div>
      </div>
    );
  }
  
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Email Verified!
            </h2>
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <p className="font-bold">Success!</p>
              <p className="block sm:inline">Your email has been verified successfully. You can now login to your account.</p>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Redirecting to login page...</p>
              <Link to="/login" className="mt-3 inline-block text-primary hover:text-primary-dark font-medium">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification Failed
          </h2>
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <p className="font-bold">Error!</p>
            <p className="block sm:inline">{error}</p>
          </div>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationPage;