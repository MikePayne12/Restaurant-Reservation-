import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Enjoy the Best Street Food Experience at KCA University
              </h1>
              <p className="text-lg mb-8">
                Book your table at KCA Streetfood and experience the vibrant
                flavors of Nairobi's best street food. Skip the long lines and
                secure your spot today!
              </p>
              {isAuthenticated ? (
                <Link
                  to="/booking"
                  className="bg-white text-primary px-6 py-3 rounded-full font-bold text-lg inline-block hover:bg-gray-100 transition duration-300"
                >
                  Book a Table
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/login"
                    className="bg-white text-primary px-6 py-3 rounded-full font-bold text-lg inline-block hover:bg-gray-100 transition duration-300"
                  >
                    Login to Book
                  </Link>
                  <Link
                    to="/register"
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold text-lg inline-block hover:bg-white hover:text-primary transition duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/images/kca-streetfood.jpg"
                  alt="KCA Streetfood Experience"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose KCA Streetfood?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <h3 className="text-xl font-bold text-center mb-4">
                Save Time
              </h3>
              <p className="text-gray-600 text-center">
                Skip the wait and reserve your table in advance. Get notified
                when your table is ready.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">
                Easy Booking
              </h3>
              <p className="text-gray-600 text-center">
                Simple and intuitive booking process. Reserve tables for any
                occasion with just a few clicks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">
                Special Requests
              </h3>
              <p className="text-gray-600 text-center">
                Add special requests or preferences to your reservation. We'll
                make sure everything is ready for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience KCA Streetfood?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book a table now and enjoy the best street food experience at KCA
            University, Ruaraka. We're excited to serve you!
          </p>
          {isAuthenticated ? (
            <Link
              to="/booking"
              className="bg-white text-primary px-8 py-3 rounded-full font-bold text-lg inline-block hover:bg-gray-100 transition duration-300"
            >
              Book Now
            </Link>
          ) : (
            <Link
              to="/register"
              className="bg-white text-primary px-8 py-3 rounded-full font-bold text-lg inline-block hover:bg-gray-100 transition duration-300"
            >
              Sign Up & Book
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;