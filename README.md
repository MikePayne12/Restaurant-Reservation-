# KCA Streetfood Restaurant Reservation System

A modern restaurant reservation system for KCA Streetfood located at KCA University, Ruaraka.

## Technologies Used

- **Frontend**: React.js with Tailwind CSS for styling
- **Backend**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [PostgreSQL](https://www.postgresql.org/) (v13.x or higher)
- [pgAdmin 4](https://www.pgadmin.org/) (optional but recommended for database management)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/restaurant-reservation.git
cd restaurant-reservation
```

### 2. Database Setup

1. Create a PostgreSQL database named `restaurant_reservation`:

```bash
psql -U postgres
CREATE DATABASE restaurant_reservation;
\q
```

2. Configure database connection:

Create a `.env` file in the server directory with the following content (adjust as needed):

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurant_reservation
DB_USER=postgres
DB_PASSWORD=your_postgresql_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
```

### 3. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the server
npm start
```

The server will run on http://localhost:5000 by default.

### 4. Frontend Setup

```bash
# Navigate to client directory in a new terminal
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

The client will run on http://localhost:3000 by default.

## Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. In a separate terminal, start the frontend application:
```bash
cd client
npm start
```

3. Access the application in your browser at http://localhost:3000

## Features

- **User Authentication**: Register, login, and manage user profiles
- **Restaurant Information**: View details about KCA Streetfood restaurant
- **Reservation Management**: Create, view, update, and cancel reservations
- **Admin Panel**: For restaurant staff to manage reservations and settings

## Default Admin Account

Username: admin  
Password: admin123  
Email: admin@kcastreetfood.com

## Project Structure

```
├── client/                  # Frontend React application
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts (auth, etc.)
│   │   ├── pages/           # Page components
│   │   └── App.js           # Main application component
├── server/                  # Backend Express application
│   ├── config/              # Configuration files
│   ├── db/                  # Database scripts and models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── index.js             # Server entry point
└── README.md                # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user information

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant details

### Reservations
- `GET /api/reservations` - Get all reservations for current user
- `POST /api/reservations` - Create a new reservation
- `GET /api/reservations/:id` - Get a specific reservation
- `PUT /api/reservations/:id` - Update a reservation
- `DELETE /api/reservations/:id` - Cancel a reservation

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL service is running
- Verify the database connection details in `.env` file
- Check if the database `restaurant_reservation` exists

### Server Startup Issues
- Check if port 5000 is already in use
- Ensure all required environment variables are set in `.env`
- Verify that the database is accessible

### Client Issues
- Clear browser cache if experiencing strange behavior
- Ensure API calls are directed to the correct server URL