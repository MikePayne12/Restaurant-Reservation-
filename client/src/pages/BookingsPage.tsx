import React, { useState } from 'react';

// Types
interface Booking {
  id: number;
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  occasion?: string;
  specialRequests?: string;
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: 1,
    date: '2025-04-15',
    time: '12:30 PM',
    guests: 2,
    status: 'confirmed',
    occasion: 'Anniversary'
  },
  {
    id: 2,
    date: '2025-04-20',
    time: '7:00 PM',
    guests: 4,
    status: 'pending'
  },
  {
    id: 3,
    date: '2025-04-25',
    time: '6:30 PM',
    guests: 3,
    status: 'confirmed',
    specialRequests: 'Prefer a quiet table'
  },
  {
    id: 4,
    date: '2025-03-10',
    time: '1:00 PM',
    guests: 2,
    status: 'completed'
  },
  {
    id: 5,
    date: '2025-03-05',
    time: '8:00 PM',
    guests: 6,
    status: 'completed',
    occasion: 'Birthday'
  },
  {
    id: 6,
    date: '2025-02-28',
    time: '7:30 PM',
    guests: 2,
    status: 'cancelled'
  }
];

// Component for rendering a single booking card
const BookingCard = ({ booking }: { booking: Booking }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">Reservation #{booking.id}</h3>
          <p className="text-gray-600">
            {formatDate(booking.date)} at {booking.time}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>
      
      <div className="border-t border-gray-200 pt-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Party Size</p>
            <p>{booking.guests} guests</p>
          </div>
          {booking.occasion && (
            <div>
              <p className="text-gray-500">Occasion</p>
              <p>{booking.occasion}</p>
            </div>
          )}
        </div>
        
        {booking.specialRequests && (
          <div className="mt-2 text-sm">
            <p className="text-gray-500">Special Requests</p>
            <p>{booking.specialRequests}</p>
          </div>
        )}
      </div>
      
      {(booking.status === 'confirmed' || booking.status === 'pending') && (
        <div className="flex justify-end mt-4 space-x-2">
          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium border border-gray-300 px-3 py-1 rounded">
            Modify
          </button>
          <button className="text-red-600 hover:text-red-800 text-sm font-medium border border-red-300 px-3 py-1 rounded">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const BookingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const upcomingBookings = mockBookings.filter(
    booking => booking.status === 'confirmed' || booking.status === 'pending'
  );
  
  const pastBookings = mockBookings.filter(
    booking => booking.status === 'completed' || booking.status === 'cancelled'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        My Bookings
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-2 px-4 text-center font-medium text-sm focus:outline-none ${
            activeTab === 'upcoming'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Upcoming Reservations
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`py-2 px-4 text-center font-medium text-sm focus:outline-none ${
            activeTab === 'past'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Past Reservations
        </button>
      </div>

      {/* Bookings list */}
      <div className="space-y-4">
        {activeTab === 'upcoming' ? (
          upcomingBookings.length > 0 ? (
            upcomingBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
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
              <p className="mt-1 text-sm text-gray-500">Make a reservation to enjoy your dining experience!</p>
              <div className="mt-6">
                <a
                  href="/booking"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Make a Reservation
                </a>
              </div>
            </div>
          )
        ) : (
          pastBookings.length > 0 ? (
            pastBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No past reservations</h3>
              <p className="mt-1 text-sm text-gray-500">Your reservation history will appear here.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BookingsPage;