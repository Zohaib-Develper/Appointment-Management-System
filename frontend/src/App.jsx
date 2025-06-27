import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./assets/stylesheets/Flash.css";
import DoctorIndex from "./pages/DoctorIndex";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import BookAppointment from "./pages/BookAppointment";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateDoctor from "./pages/CreateDoctor";
import Navbar from "./components/Navbar";
import EditDoctor from "./pages/EditDoctor";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/doctors" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<DoctorIndex />} />
          <Route
            path="/doctors/:doctorId/book"
            element={
              <ProtectedRoute redirectTo="/login" role="user">
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute redirectTo="/login" role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute redirectTo="/login" role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors/create"
            element={
              <ProtectedRoute redirectTo="/login" role="admin">
                <CreateDoctor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-doctor/:id"
            element={
              <ProtectedRoute redirectTo="/login" role="admin">
                <EditDoctor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
