import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./assets/stylesheets/Flash.css";
import DoctorIndex from "./pages/DoctorIndex";
import DoctorShow from "./pages/DoctorShow";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import BookAppointment from "./pages/BookAppointment";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<DoctorIndex />} />
          <Route path="/doctors/:doctorId" element={<DoctorShow />} />
          <Route path="/doctors/:doctorId/book" element={<BookAppointment />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
