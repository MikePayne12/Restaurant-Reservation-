import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    occasion: '',
    specialRequests: ''
  });
  
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState('');
  const [errors, setErrors] = useState({});
  
  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];
  
  const occasionOptions = [
    'None', 'Birthday', 'Anniversary', 'Business Meeting', 'Date', 'Family Gathering'
  ];
  
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormData(prev => ({
      ...prev,
      time
    }));
    
    // Clear error for time if it exists
    if (errors.time) {
      setErrors(prev => ({
        ...prev,
        time: ''
      }));
    }
  };
  
  const handleGuestChange = (change) => {
    const newGuests = Math.max(1, Math.min(10, formData.guests + change));
    setFormData(prev => ({
      ...prev,
      guests: newGuests
    }));
  };
  
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^\d{10,12}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };
  
  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your API
    console.log('Submitting reservation:', formData);
    
    // Simulate successful submission
    navigate('/booking-success');
  };
  
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Book a Table
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Reserve your table at KCA Streetfood for a delightful dining experience.
          </p>
        </div>
        
        {/* Booking Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className={`flex items-center relative ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'} flex items-center justify-center`}>
                1
              </div>
              <div className="absolute top-14 w-32 text-center text-xs font-medium uppercase">
                Select Date & Time
              </div>
            </div>
            
            <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step >= 2 ? 'border-blue-600' : 'border-gray-300'}`}></div>
            
            <div className={`flex items-center relative ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'} flex items-center justify-center`}>
                2
              </div>
              <div className="absolute top-14 w-32 text-center text-xs font-medium uppercase">
                Your Information
              </div>
            </div>
            
            <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step >= 3 ? 'border-blue-600' : 'border-gray-300'}`}></div>
            
            <div className={`flex items-center relative ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${step >= 3 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'} flex items-center justify-center`}>
                3
              </div>
              <div className="absolute top-14 w-32 text-center text-xs font-medium uppercase">
                Confirmation
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Step 1: Select Date & Time */}
          {step === 1 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Date & Time</h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Date Selection */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                    Date
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.date ? 'border-red-500' : ''}`}
                    id="date"
                    type="date"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                  )}
                </div>
                
                {/* Guest Selection */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Number of Guests
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleGuestChange(-1)}
                      className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="w-16 py-2 px-3 text-center border-t border-b border-gray-300 text-gray-700"
                      value={formData.guests}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() => handleGuestChange(1)}
                      className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Maximum 10 guests per table</p>
                </div>
              </div>
              
              {/* Time Selection */}
              <div className="mt-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      className={`py-2 px-4 border rounded text-sm font-medium ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {formatTime(time)}
                    </button>
                  ))}
                </div>
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                )}
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Personal Information */}
          {step === 2 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Information</h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0712345678"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="occasion">
                    Occasion (Optional)
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                  >
                    {occasionOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialRequests">
                  Special Requests (Optional)
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests or dietary requirements?"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Confirm Your Reservation</h2>
              
              <div className="bg-gray-50 rounded-md p-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Reservation Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600"><span className="font-medium">Restaurant:</span> KCA Streetfood</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Date:</span> {formData.date ? new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Time:</span> {formData.time ? formatTime(formData.time) : ''}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Guests:</span> {formData.guests}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {formData.name}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {formData.email}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {formData.phone}</p>
                    {formData.occasion && formData.occasion !== 'None' && (
                      <p className="text-sm text-gray-600"><span className="font-medium">Occasion:</span> {formData.occasion}</p>
                    )}
                  </div>
                </div>
                
                {formData.specialRequests && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600"><span className="font-medium">Special Requests:</span></p>
                    <p className="text-sm text-gray-600 mt-1">{formData.specialRequests}</p>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  By confirming this reservation, you agree to our booking terms and conditions. We'll send a confirmation email with all the details.
                </p>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                >
                  Confirm Reservation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingPage;