import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaClock, FaUtensils, FaDollarSign } from 'react-icons/fa';

function HomePage() {
  const restaurant = {
    id: 1,
    name: 'KCA Streetfood',
    description: 'KCA Streetfood offers a unique dining experience with a variety of local and international street food favorites. Our modern space features indoor and outdoor seating perfect for casual dining, study sessions, or catching up with friends.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    rating: '4.7',
    location: 'KCA University, Ruaraka',
    openTime: '07:00',
    closeTime: '22:00',
    features: ['Student Discounts', 'Outdoor Seating', 'Quick Service', 'Vegetarian Options', 'Breakfast Available'],
    cuisineType: 'Street Food',
    priceRange: '$'
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-primary text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">KCA Streetfood</h1>
            <p className="text-sm">Table Reservations</p>
          </div>
          <div className="text-white">
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Restaurant Card */}
      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="relative">
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
            <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
              <div className="flex items-center px-1">
                <FaStar className="text-red-500 mr-1" />
                <span className="font-bold">{restaurant.rating}</span>
              </div>
            </div>
            <div className="absolute bottom-2 left-2">
              <span className="bg-teal-400 text-white px-3 py-1 rounded-full text-sm">Campus Favorite</span>
            </div>
          </div>
          
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-3">{restaurant.name}</h2>
            
            {/* Features */}
            <div className="flex flex-wrap mb-3">
              {restaurant.features.map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                  {feature}
                </span>
              ))}
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-4 text-sm">{restaurant.description}</p>
            
            {/* Location and Hours */}
            <div className="flex items-center mb-2 text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-primary" />
              <span>{restaurant.location}</span>
            </div>
            
            <div className="flex items-center mb-2 text-gray-600">
              <FaClock className="mr-2 text-primary" />
              <span>{restaurant.openTime} - {restaurant.closeTime}</span>
            </div>
            
            <div className="flex items-center mb-4 text-gray-600">
              <FaUtensils className="mr-2 text-primary" />
              <span>{restaurant.cuisineType}</span>
              <span className="mx-2">•</span>
              <FaDollarSign className="text-primary" />
            </div>
            
            {/* Book Now Button */}
            <Link 
              to="/booking" 
              className="block w-full bg-primary text-white text-center py-3 rounded-lg font-bold"
            >
              Book Now
            </Link>
          </div>
        </div>
        
        {/* Opening Hours Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-3">
            <FaClock className="text-primary mr-2" />
            <h3 className="text-lg font-bold">Opening Hours</h3>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Monday - Friday:</span>
            <span>07:00 - 22:00</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Saturday:</span>
            <span>08:00 - 22:00</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Sunday:</span>
            <span>09:00 - 20:00</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        <Link to="/" className="flex flex-col items-center text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/bookings" className="flex flex-col items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <span className="text-xs">Bookings</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </div>
  );
}

export default HomePage;