import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./assets/stylesheets/Flash.css";
import DoctorIndex from "./pages/DoctorIndex";
import DoctorShow from "./pages/DoctorShow";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/dashboard" element={<div>Hello!</div>} />
          <Route path="/doctors" element={<DoctorIndex />} />
          <Route path="/doctors/:id" element={<DoctorShow />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
