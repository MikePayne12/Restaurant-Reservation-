import React, { useState } from 'react';

function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '0712345678',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password change validation
    if (
      (formData.newPassword || formData.confirmPassword) && 
      !formData.currentPassword
    ) {
      setMessage({
        type: 'error',
        text: 'Please enter your current password to change password'
      });
      return;
    }
    
    if (
      formData.newPassword && 
      formData.newPassword !== formData.confirmPassword
    ) {
      setMessage({
        type: 'error',
        text: 'New password and confirmation do not match'
      });
      return;
    }
    
    // In a real application, we would call the API to update profile
    console.log('Updating profile with:', formData);
    
    // Simulating successful update
    setMessage({
      type: 'success',
      text: 'Profile updated successfully'
    });
    
    setIsEditing(false);
    
    // Clear password fields
    setFormData(prevState => ({
      ...prevState,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            {message.text && (
              <div 
                className={`p-4 mb-4 rounded-md ${
                  message.type === 'success' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isEditing && 'bg-gray-100'}`}
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isEditing && 'bg-gray-100'}`}
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isEditing && 'bg-gray-100'}`}
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                  <p className="text-gray-600 mb-4 text-sm">Leave blank if you don't want to change your password</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                        Current Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="currentPassword"
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="col-span-1"></div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                        New Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm New Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {isEditing && (
                <div className="flex justify-end mt-8 space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setMessage({ type: '', text: '' });
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Account Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <h4 className="font-medium text-gray-800">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive booking confirmations and reminders</p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input type="checkbox" id="toggleEmail" className="sr-only" defaultChecked />
                  <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                  <div className="dot absolute left-1 top-1 h-4 w-4 bg-white rounded-full transition"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <h4 className="font-medium text-gray-800">SMS Notifications</h4>
                  <p className="text-sm text-gray-600">Receive updates via text message</p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input type="checkbox" id="toggleSMS" className="sr-only" />
                  <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                  <div className="dot absolute left-1 top-1 h-4 w-4 bg-white rounded-full transition"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <h4 className="font-medium text-gray-800">Marketing Communications</h4>
                  <p className="text-sm text-gray-600">Receive special offers and promotions</p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input type="checkbox" id="toggleMarketing" className="sr-only" defaultChecked />
                  <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                  <div className="dot absolute left-1 top-1 h-4 w-4 bg-white rounded-full transition"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;