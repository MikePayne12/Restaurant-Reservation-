import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-orange-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold">KCA Streetfood</Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-orange-200 transition-colors">Home</Link>
            
            {currentUser ? (
              <>
                <Link to="/booking" className="hover:text-orange-200 transition-colors">Make Reservation</Link>
                <Link to="/bookings" className="hover:text-orange-200 transition-colors">My Bookings</Link>
                <Link to="/profile" className="hover:text-orange-200 transition-colors">Profile</Link>
                {currentUser.is_admin && (
                  <Link to="/admin" className="hover:text-orange-200 transition-colors">Admin</Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="bg-white text-orange-500 hover:bg-orange-100 px-4 py-1 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-orange-200 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-orange-500 hover:bg-orange-100 px-4 py-1 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-3 md:hidden bg-orange-600 rounded-md p-4 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="hover:text-orange-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/booking" 
                  className="hover:text-orange-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Make Reservation
                </Link>
                <Link 
                  to="/bookings" 
                  className="hover:text-orange-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
                <Link 
                  to="/profile" 
                  className="hover:text-orange-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {currentUser.is_admin && (
                  <Link 
                    to="/admin" 
                    className="hover:text-orange-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-white text-orange-500 hover:bg-orange-100 px-4 py-1 rounded-md transition-colors w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-orange-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-orange-500 hover:bg-orange-100 px-4 py-1 rounded-md transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;