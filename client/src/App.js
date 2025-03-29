import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import BookingsPage from './pages/BookingsPage';
import BookingSuccess from './pages/BookingSuccess';
import AdminDashboard from './pages/AdminDashboard';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;