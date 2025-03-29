import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TimeSlot = ({ time, selected, onClick }: { time: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium ${
      selected
        ? 'bg-primary text-white'
        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
    }`}
  >
    {time}
  </button>
);

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM'
  ];

  const occasions = [
    'Regular Dining', 'Birthday', 'Anniversary', 'Business Meeting',
    'Date', 'Family Gathering', 'Other'
  ];

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, we would submit the booking to the server here
    console.log({ date, time, guests, occasion, specialRequests });
    navigate('/booking-confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Book a Table at KCA Streetfood
        </h1>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          <div className="w-full">
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                ></div>
              </div>
              <div className="flex text-xs text-gray-600 justify-between">
                <div className={`flex-1 text-center ${currentStep >= 1 ? 'text-primary font-semibold' : ''}`}>
                  Date & Time
                </div>
                <div className={`flex-1 text-center ${currentStep >= 2 ? 'text-primary font-semibold' : ''}`}>
                  Party Details
                </div>
                <div className={`flex-1 text-center ${currentStep >= 3 ? 'text-primary font-semibold' : ''}`}>
                  Review & Confirm
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Date and Time */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <TimeSlot
                        key={slot}
                        time={slot}
                        selected={time === slot}
                        onClick={() => setTime(slot)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!date || !time}
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next: Party Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Party Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="bg-gray-200 rounded-l-md px-3 py-2 text-gray-700 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-16 text-center border-y border-gray-300 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(20, guests + 1))}
                      className="bg-gray-200 rounded-r-md px-3 py-2 text-gray-700 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select an occasion (optional)</option>
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={4}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="Any dietary requirements or special requests? (optional)"
                  ></textarea>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
                  >
                    Next: Review
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review and Confirm */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Review Booking Details</h3>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">
                        {date
                          ? new Date(date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Party Size</p>
                      <p className="font-medium">{guests} guests</p>
                    </div>
                    {occasion && (
                      <div>
                        <p className="text-sm text-gray-500">Occasion</p>
                        <p className="font-medium">{occasion}</p>
                      </div>
                    )}
                  </div>
                  {specialRequests && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Special Requests</p>
                      <p className="font-medium">{specialRequests}</p>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 p-4 border border-yellow-100 rounded-md">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Note:</span> By confirming this reservation, you agree to our
                    cancellation policy. Please cancel at least 2 hours before your booking time to
                    avoid any penalties.
                  </p>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;