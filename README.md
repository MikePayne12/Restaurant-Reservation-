# KCA Streetfood Restaurant Reservation System

A comprehensive mobile restaurant reservation platform specifically for KCA Streetfood located at KCA University, Ruaraka. The system leverages advanced technology to enhance dining experiences and simplify restaurant bookings.

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Express.js with Node.js
- **Database**: PostgreSQL with raw SQL queries
- **Authentication**: JWT tokens, bcrypt password hashing
- **Session Management**: Express-session with PostgreSQL session store

## Prerequisites

Before you can run this application, you need to have the following installed:

1. Node.js (v14 or higher)
2. npm or yarn
3. PostgreSQL (v12 or higher)

## Initial Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/restaurant-reservation.git
cd restaurant-reservation
```

### 2. Database Setup

1. Create a PostgreSQL database named `restaurant_reservation`:

```sql
CREATE DATABASE restaurant_reservation;
```

2. The database tables will be automatically created when the server starts.

### 3. Environment Configuration

1. Copy the sample environment file to create your own:

```bash
cp .env.sample .env
```

2. Edit the `.env` file with your PostgreSQL credentials and other settings:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurant_reservation
DB_USER=postgres
DB_PASSWORD=your_password_here

# Server Configuration
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Authentication
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_key_here
```

### 4. Install Dependencies

```bash
# Install both server and client dependencies
npm run install-all
```

## Running the Application

```bash
# Start both the server and client
npm run dev
```

This will start:
- The backend server on port 3001 (or the port specified in your .env file)
- The frontend client on port 3000

## Testing the Database Connection

To verify that your database connection is working:

```bash
node test-db-connection.js
```

## Available Scripts

- `npm run install-all`: Install both server and client dependencies
- `npm run server`: Start only the backend server
- `npm run client`: Start only the frontend client
- `npm run dev`: Start both server and client concurrently
- `npm run build`: Build the client for production

## Features

- User authentication (register, login, logout)
- Restaurant information display
- Table availability checking
- Reservation creation and management
- User profile management
- Responsive design for mobile and desktop

## User Roles

- **Customer**: Regular users who can browse restaurant information and make reservations
- **Admin**: Restaurant staff who can manage reservations, tables, and view analytics

## License

[MIT](LICENSE)