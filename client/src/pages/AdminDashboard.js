import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// Placeholder components for admin dashboard sections
const Dashboard = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Reservations</h3>
        <p className="text-3xl font-bold text-blue-600">8</p>
        <p className="text-sm text-gray-500 mt-2">5 confirmed, 3 pending</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Available Tables</h3>
        <p className="text-3xl font-bold text-green-600">12</p>
        <p className="text-sm text-gray-500 mt-2">Out of 20 total tables</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Customers</h3>
        <p className="text-3xl font-bold text-purple-600">125</p>
        <p className="text-sm text-gray-500 mt-2">15 new this week</p>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Reservations</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guest
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Party Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">John Doe</div>
                <div className="text-sm text-gray-500">john.doe@example.com</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Apr 15, 2025</div>
                <div className="text-sm text-gray-500">6:30 PM</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2 guests
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Confirmed
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                <div className="text-sm text-gray-500">jane.smith@example.com</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Apr 15, 2025</div>
                <div className="text-sm text-gray-500">7:00 PM</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                4 guests
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                <a href="#" className="text-green-600 hover:text-green-900 mr-3">Confirm</a>
                <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ReservationManagement = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-6">Reservation Management</h2>
    
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">All Reservations</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search reservations..."
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">Search</button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reservation ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guest
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Party Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Table
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                #1001
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">John Doe</div>
                <div className="text-sm text-gray-500">0712345678</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Apr 15, 2025</div>
                <div className="text-sm text-gray-500">6:30 PM</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2 guests
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Table 5
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Confirmed
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
                <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                #1002
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                <div className="text-sm text-gray-500">0723456789</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Apr 15, 2025</div>
                <div className="text-sm text-gray-500">7:00 PM</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                4 guests
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Table 8
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
                <a href="#" className="text-green-600 hover:text-green-900 mr-3">Confirm</a>
                <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                #1003
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Michael Johnson</div>
                <div className="text-sm text-gray-500">0734567890</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Apr 16, 2025</div>
                <div className="text-sm text-gray-500">1:00 PM</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                6 guests
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Table 12
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Confirmed
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
                <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TableManagement = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-6">Table Management</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Table</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableNumber">
              Table Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tableNumber"
              type="text"
              placeholder="Enter table number"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
              Capacity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="capacity"
              type="number"
              placeholder="Number of seats"
              min="1"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
            >
              <option value="">Select location</option>
              <option value="window">Window</option>
              <option value="center">Center</option>
              <option value="outdoor">Outdoor</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Add Table
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Table Status</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="border border-green-500 bg-green-100 rounded p-3 text-center">
            <p className="font-bold">Table 1</p>
            <p className="text-sm text-gray-600">2 seats</p>
            <p className="text-xs mt-1 text-green-700">Available</p>
          </div>
          
          <div className="border border-red-500 bg-red-100 rounded p-3 text-center">
            <p className="font-bold">Table 2</p>
            <p className="text-sm text-gray-600">4 seats</p>
            <p className="text-xs mt-1 text-red-700">Reserved</p>
          </div>
          
          <div className="border border-green-500 bg-green-100 rounded p-3 text-center">
            <p className="font-bold">Table 3</p>
            <p className="text-sm text-gray-600">2 seats</p>
            <p className="text-xs mt-1 text-green-700">Available</p>
          </div>
          
          <div className="border border-red-500 bg-red-100 rounded p-3 text-center">
            <p className="font-bold">Table 4</p>
            <p className="text-sm text-gray-600">6 seats</p>
            <p className="text-xs mt-1 text-red-700">Reserved</p>
          </div>
          
          <div className="border border-green-500 bg-green-100 rounded p-3 text-center">
            <p className="font-bold">Table 5</p>
            <p className="text-sm text-gray-600">4 seats</p>
            <p className="text-xs mt-1 text-green-700">Available</p>
          </div>
          
          <div className="border border-yellow-500 bg-yellow-100 rounded p-3 text-center">
            <p className="font-bold">Table 6</p>
            <p className="text-sm text-gray-600">8 seats</p>
            <p className="text-xs mt-1 text-yellow-700">Maintenance</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">All Tables</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Table Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Table 1
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2 seats
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Window
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Available
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
                <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Table 2
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                4 seats
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Center
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Reserved
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
                <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Table 3
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2 seats
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Window
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Available
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
                <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const UserManagement = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-6">User Management</h2>
    
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">All Users</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search users..."
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">Search</button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email / Phone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reservations
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">John Doe</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">john.doe@example.com</div>
                <div className="text-sm text-gray-500">0712345678</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Customer
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                5 reservations
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                <a href="#" className="text-yellow-600 hover:text-yellow-900 mr-3">Edit</a>
                <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Jane Smith</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">jane.smith@example.com</div>
                <div className="text-sm text-gray-500">0723456789</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Admin
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                0 reservations
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                <a href="#" className="text-yellow-600 hover:text-yellow-900 mr-3">Edit</a>
                <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Michael Johnson</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">michael.johnson@example.com</div>
                <div className="text-sm text-gray-500">0734567890</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Customer
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Inactive
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2 reservations
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                <a href="#" className="text-yellow-600 hover:text-yellow-900 mr-3">Edit</a>
                <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Settings = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-6">Restaurant Settings</h2>
    
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Restaurant Information</h3>
      
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Restaurant Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              defaultValue="KCA Streetfood"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuisineType">
              Cuisine Type
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cuisineType"
              type="text"
              defaultValue="Street Food"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              defaultValue="KCA University, Ruaraka, Nairobi"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
              Total Capacity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="capacity"
              type="number"
              defaultValue="50"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="openTime">
              Opening Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="openTime"
              type="time"
              defaultValue="08:00"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="closeTime">
              Closing Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="closeTime"
              type="time"
              defaultValue="21:00"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            rows="4"
            defaultValue="Located at KCA University in Ruaraka, KCA Streetfood offers a diverse menu of delicious meals in a comfortable environment."
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
    
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Reservation Settings</h3>
      
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reservationInterval">
              Reservation Interval (minutes)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reservationInterval"
              type="number"
              defaultValue="30"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxReservationSize">
              Maximum Party Size
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="maxReservationSize"
              type="number"
              defaultValue="10"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="advanceBookingDays">
              Advance Booking (days)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="advanceBookingDays"
              type="number"
              defaultValue="30"
            />
          </div>
          
          <div className="flex items-center mt-4">
            <input id="requireConfirmation" type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
            <label htmlFor="requireConfirmation" className="ml-2 block text-sm text-gray-900">
              Require admin confirmation for all reservations
            </label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  </div>
);

function AdminDashboard() {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'dashboard';
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-white shadow-md lg:h-screen">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
            <p className="text-sm text-gray-500">KCA Streetfood</p>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center px-4 py-2 rounded-md ${
                    currentPath === 'dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/reservations"
                  className={`flex items-center px-4 py-2 rounded-md ${
                    currentPath === 'reservations'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Reservations
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/tables"
                  className={`flex items-center px-4 py-2 rounded-md ${
                    currentPath === 'tables'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                  </svg>
                  Tables
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className={`flex items-center px-4 py-2 rounded-md ${
                    currentPath === 'users'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/settings"
                  className={`flex items-center px-4 py-2 rounded-md ${
                    currentPath === 'settings'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t mt-auto">
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Main Site
            </Link>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reservations" element={<ReservationManagement />} />
            <Route path="tables" element={<TableManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;