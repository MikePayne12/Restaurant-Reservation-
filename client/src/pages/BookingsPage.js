import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data for demonstration
  const upcomingReservations = [
    {
      id: 1,
      date: '2025-04-15',
      time: '18:30',
      guests: 2,
      status: 'confirmed',
      restaurantName: 'KCA Streetfood',
      occasion: 'Date night'
    },
    {
      id: 2,
      date: '2025-04-22',
      time: '19:00',
      guests: 4,
      status: 'confirmed',
      restaurantName: 'KCA Streetfood',
      occasion: 'Business meeting'
    }
  ];
  
  const pastReservations = [
    {
      id: 3,
      date: '2025-03-10',
      time: '12:30',
      guests: 2,
      status: 'completed',
      restaurantName: 'KCA Streetfood',
      occasion: 'Lunch'
    },
    {
      id: 4,
      date: '2025-02-20',
      time: '19:30',
      guests: 6,
      status: 'completed',
      restaurantName: 'KCA Streetfood',
      occasion: 'Birthday'
    }
  ];
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleCancelReservation = (id) => {
    // In a real app, this would call the API to cancel the reservation
    console.log(`Cancelling reservation ${id}`);
    alert(`Reservation ${id} has been cancelled.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Reservations</h2>
            
            {/* Tabs */}
            <div className="border-b mb-6">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'upcoming'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Upcoming Reservations
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'past'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Past Reservations
                </button>
              </nav>
            </div>
            
            {/* Upcoming Reservations */}
            {activeTab === 'upcoming' && (
              <div>
                {upcomingReservations.length === 0 ? (
                  <div className="text-center py-8">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming reservations</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by booking a table.</p>
                    <div className="mt-6">
                      <Link
                        to="/booking"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Make a Reservation
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {upcomingReservations.map((reservation) => (
                      <div key={reservation.id} className="border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-semibold">{reservation.restaurantName}</h3>
                              <span
                                className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                                  reservation.status
                                )}`}
                              >
                                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-600">{formatDate(reservation.date)} at {formatTime(reservation.time)}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Link
                              to={`/booking-details/${reservation.id}`}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => handleCancelReservation(reservation.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Guests:</span> {reservation.guests}
                          </div>
                          {reservation.occasion && (
                            <div>
                              <span className="font-medium">Occasion:</span> {reservation.occasion}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">Booking ID:</span> #{reservation.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-8 flex justify-center">
                  <Link
                    to="/booking"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Make a New Reservation
                  </Link>
                </div>
              </div>
            )}
            
            {/* Past Reservations */}
            {activeTab === 'past' && (
              <div>
                {pastReservations.length === 0 ? (
                  <div className="text-center py-8">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No past reservations</h3>
                    <p className="mt-1 text-sm text-gray-500">Your reservation history will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pastReservations.map((reservation) => (
                      <div key={reservation.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-semibold">{reservation.restaurantName}</h3>
                              <span
                                className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                                  reservation.status
                                )}`}
                              >
                                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-600">{formatDate(reservation.date)} at {formatTime(reservation.time)}</p>
                          </div>
                          <div>
                            <Link
                              to={`/booking-details/${reservation.id}`}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Guests:</span> {reservation.guests}
                          </div>
                          {reservation.occasion && (
                            <div>
                              <span className="font-medium">Occasion:</span> {reservation.occasion}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">Booking ID:</span> #{reservation.id}
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Link
                            to={`/booking?repeat=${reservation.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Book Again
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingsPage;