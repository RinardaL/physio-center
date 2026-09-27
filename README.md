# Physio Center Management System

A full-stack web application for running a physiotherapy clinic: patients, therapists, appointments, treatment plans, exercise programmes, clinical assessments, equipment and online payments.

**Tech stack:** React 19 · React Router · Axios · Recharts · Node.js · Express 5 · Sequelize · MySQL · JWT · bcrypt · Stripe

<!-- Add 2–3 screenshots here, e.g.:
![Dashboard](docs/dashboard.png)
![Appointments](docs/appointments.png)
-->

---

## Features

- **Authentication and roles:** register and log in with JWT access and refresh tokens and bcrypt-hashed passwords. Role-based access (`patient` / `therapist`) is enforced in Express middleware and in React `ProtectedRoute` / `RoleRoute` components.
- **Clinic management (CRUD):** patients, therapists, appointments, sessions, treatments, treatment plans, exercises, exercise plans, clinical assessments and equipment.
- **Payments:** Stripe Checkout with webhook handling, plus a payment history.
- **Admin dashboard:** charts and statistics built with Recharts.
- **Public website:** home, services and therapists pages.

## Architecture

```
physio-center/
├── backend/                 # Express REST API
│   ├── server.js            # App entry: middleware, routes, DB sync
│   └── src/
│       ├── config/          # Sequelize (MySQL) and Stripe config
│       ├── models/          # 12 Sequelize models + associations
│       ├── controllers/     # Business logic per resource
│       ├── routes/          # REST endpoints under /api/*
│       └── middleware/      # JWT auth, therapist-only guard
├── frontend/                # React SPA (Create React App)
│   └── src/
│       ├── pages/admin/     # Dashboard and management screens
│       ├── pages/public/    # Public website
│       ├── route/           # ProtectedRoute, RoleRoute
│       └── api.js           # Axios instance
└── postman/                 # Postman environment for API testing
```

## API overview

| Resource | Base path |
|---|---|
| Auth (register / login / refresh) | `/api/auth` |
| Patients | `/api/patients` |
| Therapists | `/api/therapists` |
| Appointments | `/api/appointments` |
| Sessions | `/api/sessions` |
| Treatments / Treatment plans | `/api/treatments`, `/api/treatment-plans` |
| Exercises / Exercise plans | `/api/exercises`, `/api/exercise-plans` |
| Clinical assessments | `/api/clinicalAssessment` |
| Payments / Stripe | `/api/payments`, `/api/stripe` |

## Getting started

**Requirements:** Node.js 18+ and MySQL 8.

### 1. Backend
```bash
cd backend
npm install
```
Create `backend/.env`:
```env
PORT=3000
DB_HOST=localhost
DB_NAME=physio_center
DB_USER=root
DB_PASSWORD=your_password
ACCESS_SECRET=your_access_token_secret
REFRESH_SECRET=your_refresh_token_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...   # from `stripe listen` or the Stripe dashboard
```
Create the database (`CREATE DATABASE physio_center;`), then start the API. Tables are created automatically by Sequelize.
```bash
node server.js
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
```
The app runs at http://localhost:3001 and proxies API calls to http://localhost:3000.

## What I learned

- Designing relational data models and associations with Sequelize.
- Securing a REST API with JWT access and refresh tokens and role-based authorization.
- Integrating a third-party payment provider (Stripe) and handling webhooks.
- Structuring a React app with protected, role-aware routing.

## Author

**Rinarda Lahu** · [GitHub](https://github.com/RinardaL) · rinardalahu1@gmail.com
