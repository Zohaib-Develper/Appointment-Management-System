# Appointment-Management-System

▶ [Watch Demo Video](demo/demo.mp4?raw=true)

A full-stack Doctor Appointment Booking System built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js) that allows users to register, login, browse doctors, and book appointments. Admins can manage doctors and monitor appointment statuses.

---

## 📌 Project Overview

This system supports:

- **User Role**: Registration, login, booking appointments, dashboard view.
- **Admin Role**: Managing doctors (CRUD), viewing and updating appointment statuses.
- **JWT Auth with Refresh Tokens**: Secure authentication with refresh token rotation.
- **Role-Based Access**: Certain routes are protected based on user roles.
- **Great UI** with React, React Router, and Bootstrap.

---

## 🚀 Setup Instructions

### 💻 Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add the environment variables listed below.

4. Start the server:

   ```bash
   npm run dev
   ```

---

### 🖼️ Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

---

## 🔐 Environment Variables

Create a `.env` file in your backend using .env.example

> Ensure MongoDB is running locally or use MongoDB Atlas.

---

## 📡 API Documentation (Brief)

### ✅ **Authentication**

| Method | Endpoint                  | Access | Description                        |
| ------ | ------------------------- | ------ | ---------------------------------- |
| POST   | `/api/auth/register`      | Public | Register a new user or admin       |
| POST   | `/api/auth/login`         | Public | Login and receive access token     |
| GET    | `/api/auth/refresh-token` | Cookie | Get a new access token via refresh |
| POST   | `/api/auth/logout`        | Auth   | Logout and clear refresh token     |
| GET    | `/api/auth/me`            | Auth   | Get current user/admin profile     |

---

### 👨‍⚕️ **Doctors (Admin Only)**

| Method | Endpoint           | Access | Description           |
| ------ | ------------------ | ------ | --------------------- |
| GET    | `/api/doctors`     | Public | Get all doctors       |
| GET    | `/api/doctors/:id` | Public | Get a specific doctor |
| POST   | `/api/doctors`     | Admin  | Create a new doctor   |
| PUT    | `/api/doctors/:id` | Admin  | Update doctor details |
| DELETE | `/api/doctors/:id` | Admin  | Delete a doctor       |

---

### 🗕️ **Appointments**

| Method | Endpoint                       | Access     | Description                    |
| ------ | ------------------------------ | ---------- | ------------------------------ |
| POST   | `/api/appointments`            | User       | Book an appointment            |
| GET    | `/api/appointments`            | User/Admin | Get appointments based on role |
| PATCH  | `/api/appointments/:id/status` | Admin      | Update appointment status      |

---

## 📂 Project Structure

```
/frontend
  └── src/
      ├── pages/
      ├── components/
      ├── context/
      ├── utils/
      └── App.jsx

/backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middlewares/
  ├── utils/
  └── app.js
```

---
