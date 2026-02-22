# Dress E-commerce Website

A full-stack e-commerce platform for dresses built with React, Node.js, Express, and MongoDB.

## Features
- **User Authentication**: Secure register and login with JWT.
- **Product Catalog**: Browse dresses by category with search functionality.
- **Product Details**: Detailed view with size selection and stock management.
- **Shopping Cart**: Add/remove items and update quantities (works for guests too!).
- **Responsive Design**: Optimized for mobile, tablet, and desktop using Bootstrap.
- **Modern UI**: Stylish design with glassmorphism and smooth transitions.

## Tech Stack
- **Frontend**: React.js, Bootstrap, React Router, Axios, Lucide Icons.
- **Backend**: Node.js, Express.js, JWT, BcryptJS.
- **Database**: MongoDB with Mongoose.

## Getting Started

### Prerequisites
- Node.js installed.
- MongoDB running locally or a MongoDB Atlas URI.

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create/Edit `.env` file:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/dress-website
   JWT_SECRET=your_jwt_secret_key
   ```
4. Seed the database (Optional):
   ```bash
   node seeder.js
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

## Folder Structure
- `backend/`: Models, routes, controllers, and middleware.
- `frontend/`: React application with components, pages, and context.
