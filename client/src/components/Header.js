import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-200 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">KCA Streetfood</span>
              <div className="text-blue-600 font-bold text-2xl">KCA Streetfood</div>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link 
                to="/" 
                className={`${isCurrentPath('/') ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'} text-base font-medium`}
              >
                Home
              </Link>
              <Link 
                to="/booking" 
                className={`${isCurrentPath('/booking') ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'} text-base font-medium`}
              >
                Book a Table
              </Link>
              <Link 
                to="/bookings" 
                className={`${isCurrentPath('/bookings') ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'} text-base font-medium`}
              >
                My Reservations
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            <div className="hidden lg:flex">
              <Link 
                to="/login" 
                className={`${isCurrentPath('/login') ? 'bg-gray-100' : ''} inline-block bg-white py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50`}
              >
                Sign in
              </Link>
              <Link 
                to="/register" 
                className="ml-4 inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-white hover:bg-blue-700"
              >
                Sign up
              </Link>
            </div>
            <div className="lg:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                {!isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="py-4 space-y-1 sm:px-3 lg:hidden">
            <Link 
              to="/"
              className={`${isCurrentPath('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/booking"
              className={`${isCurrentPath('/booking') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Table
            </Link>
            <Link 
              to="/bookings"
              className={`${isCurrentPath('/bookings') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Reservations
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="space-y-1">
                <Link
                  to="/login"
                  className={`${isCurrentPath('/login') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'} block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className={`${isCurrentPath('/register') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'} block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;