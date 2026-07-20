# 🚗 Rent VORTEX — Car Rental Platform

> A full-stack, peer-to-peer car rental web application. Rent cars from real hosts near you, or list your own vehicle and earn money — all in one platform.

![React](https://img.shields.io/badge/React-18-blue?logo=react) ![Node](https://img.shields.io/badge/Node.js-Express-green?logo=node.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb) ![Stripe](https://img.shields.io/badge/Stripe-Payments-blueviolet?logo=stripe) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss) ![Vite](https://img.shields.io/badge/Vite-5-yellow?logo=vite)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Pages Overview](#-pages-overview)
- [Responsive Design](#-responsive-design)
- [Authors](#-authors)

---

## ✨ Features

### For Renters 🙋‍♂️
- Browse available cars with search and category filters (Economy, Comfort, SUV, Luxury)
- View cars on an **interactive map** (OpenStreetMap + Leaflet)
- Book a car with custom start/end dates and pickup location pin
- Optional driver booking (+₹100/hr)
- Secure **Stripe payment** integration
- View and cancel your bookings

### For Hosts 🏠
- Enlist your car for rent with location, photos, fuel type, capacity & pricing
- Dedicated **Host Dashboard** with earnings tracking, listing management, and booking approval/rejection
- Real-time net earnings calculation (15% platform commission applied)

### General
- JWT-based authentication with cookie sessions
- Protected routes (auto-redirect on expired sessions)
- Fully **responsive design** — works on mobile, tablet, and desktop
- Skeleton loading states and error boundaries

---

## 🛠 Tech Stack

### Frontend (`/client`)
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 5** | Build tool & dev server |
| **React Router v6** | Client-side routing |
| **TailwindCSS 3** | Utility-first styling |
| **React Leaflet** | Interactive maps |
| **Stripe.js / React Stripe** | Payment processing |
| **Axios** | HTTP client |
| **React Cookie** | Cookie management for auth sessions |

### Backend (`/server`)
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Stripe SDK** | Payment intent creation |
| **CORS** | Cross-origin requests |

---

## 📁 Project Structure

```
Rent-VORTEX/
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images (car photos, logos, team photos)
│   │   ├── components/
│   │   │   ├── CarModel.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── PaymentModal.jsx
│   │   │   ├── SkeletonLoader.jsx
│   │   │   └── Spinner.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx  # Global state (auth, cars, bookings)
│   │   ├── pages/
│   │   │   ├── Landing_page.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── AllCarBookingsPage.jsx
│   │   │   ├── HostDashboard.jsx
│   │   │   ├── EnlistCar.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Help.jsx
│   │   │   └── SuccessPage.jsx
│   │   ├── services/
│   │   │   └── api.js          # Axios instance with base URL
│   │   ├── App.jsx             # Routes & protected route wrapper
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                     # Node.js Backend
    ├── config/
    │   └── database.js         # MongoDB connection
    ├── controllers/
    │   ├── user_controller.js
    │   ├── car_controller.js
    │   └── booking_controller.js
    ├── models/
    │   ├── user_model.js
    │   ├── cars_model.js
    │   └── booking_model.js
    ├── routes/
    │   ├── user_auth_routes.js
    │   ├── car_routes.js
    │   └── booking_routes.js
    ├── .env.example
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ and **npm**
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Stripe** account (for payment processing)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Sushant123450/Rent-VORTEX.git
cd Rent-VORTEX
```

---

### 2. Setup the Server (Backend)

```bash
cd server
npm install
```

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Fill in your values (see Environment Variables), then start the server:

```bash
# Development (with nodemon auto-restart)
npm run dev

# Production
npm start
```

The server runs on **http://localhost:5500** by default.

---

### 3. Setup the Client (Frontend)

```bash
cd ../client
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

Start the dev server:

```bash
npm run dev
```

The app will run on **http://localhost:5173** by default.

---

### 4. Build for Production

```bash
cd client
npm run build
```

The production files will be output to `client/dist/`.

---

## 🔐 Environment Variables

### Server — `server/.env`

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port to run the API server | `5500` |
| `DATABASE_URL` | MongoDB connection string | `mongodb://127.0.0.1:27017/rent-vortex` |
| `JWT_SECRET` | Secret key for signing JWTs | `mysupersecretkey123` |
| `STRIPE_SECRET_KEY` | Stripe secret key (from Stripe dashboard) | `sk_test_...` |

### Client — `client/.env`

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL for the backend API | `http://localhost:5500/api/v1` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` |

> ⚠️ Never commit your `.env` files. They are listed in `.gitignore`.

---

## 📡 API Reference

All routes are prefixed with `/api/v1`.

### 👤 Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login and receive a JWT token |

### 🚘 Car Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/getallcars` | Fetch all listed cars |
| `POST` | `/addcar` | Add a new car listing |
| `POST` | `/editcar` | Edit an existing car |
| `POST` | `/deletecar` | Delete a car listing |

### 📅 Booking Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/bookcar` | Create a new booking |
| `GET` | `/getallbookings` | Get all bookings for the logged-in user |
| `DELETE` | `/cancelbooking/:bookingID` | Cancel a booking by ID |
| `POST` | `/create-payment-intent` | Create a Stripe payment intent |
| `GET` | `/getownerbookings/:ownerId` | Get all bookings for a host vehicle |
| `POST` | `/update-booking-status` | Approve or reject a booking request |

---

## 📄 Pages Overview

| Route | Page | Auth Required |
|---|---|---|
| `/` | Landing Page | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/about` | About Us | No |
| `/help` | Help & FAQ | No |
| `/dashboard` | Car Browse & Search | Yes |
| `/booking/:id` | Car Booking Form + Payment | Yes |
| `/carbookings` | My Bookings | Yes |
| `/host-dashboard` | Host Earnings & Listings | Yes |
| `/enlist-car` | List a Car for Rent | Yes |
| `/success` | Booking Success | Yes |

---

## 📱 Responsive Design

Rent VORTEX is fully responsive across all screen sizes using **Tailwind CSS breakpoints**:

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 640px | Single column, hamburger nav, swipeable cards |
| Tablet | 640px to 768px | Two columns, expanded nav |
| Desktop | > 768px | Full multi-column layout, side images, complete nav |

Key mobile adaptations:
- Hamburger navigation on Landing page (hidden on desktop)
- Login/Register hide the side car image on mobile — form takes full width
- Car gallery on Landing is a horizontal swipe carousel on mobile
- Host Dashboard tabs wrap and resize on small screens
- Map height is reduced on mobile for better usability

---

## 👨‍💻 Authors

| Name | Role |

| **Yash Kumar** | Full Stack Developer |

---

## 📝 License

This project is licensed under the **ISC License**.

---

> Built with love at ABESIT College
