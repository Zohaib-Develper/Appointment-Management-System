import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./assets/stylesheets/Flash.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/dashboard" element={<div>Hello!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
