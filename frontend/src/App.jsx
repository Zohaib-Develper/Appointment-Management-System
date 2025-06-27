import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./assets/stylesheets/Flash.css";
import DoctorIndex from "./pages/DoctorIndex";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import BookAppointment from "./pages/BookAppointment";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
//import CreateDoctor from "./pages/CreateDoctor";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<DoctorIndex />} />
          <Route path="/doctors/:doctorId/book" element={<BookAppointment />} />
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
          {/* <Route
            path="/admin/doctors/create"
            element={
              <ProtectedRoute redirectTo="/login" role="admin">
                <CreateDoctor />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
