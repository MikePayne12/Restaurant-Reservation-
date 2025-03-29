import React from 'react';
import { Link } from 'react-router-dom';

function BookingSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-12">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="mt-6 text-2xl font-extrabold text-gray-900">Reservation Confirmed!</h2>
        <p className="mt-2 text-gray-600">
          Your table has been successfully reserved. We've sent a confirmation email with all the details.
        </p>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">Reservation Details</h3>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Restaurant:</span> KCA Streetfood</p>
            <p><span className="font-medium">Date:</span> April 15, 2025</p>
            <p><span className="font-medium">Time:</span> 7:00 PM</p>
            <p><span className="font-medium">Guests:</span> 2</p>
            <p><span className="font-medium">Reservation ID:</span> #12345</p>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link
            to="/bookings"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View My Bookings
          </Link>
          
          <Link
            to="/"
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccess;