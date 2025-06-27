import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../axios";
import { useFlash } from "../context/FlashContext";

const Navbar = () => {
  const { authUser, logout } = useAuth();
  const { showFlash } = useFlash();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  if (path.includes("login") || path.includes("register")) return;

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      logout();
      navigate("login");
      showFlash("LogedOut!", "success");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navContent"
        aria-controls="navContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {authUser?.role === "admin" && (
            <>
              <div className="d-flex gap-3 flex-wrap">
                <div className="text-white fw-bold d-flex align-items-center">
                  Admin Dashboard
                </div>
                <Link
                  to="/admin/doctors/create"
                  className="btn btn-success fw-bold shadow"
                >
                  ➕ Add Doctor
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="btn btn-primary fw-semibold"
                >
                  View Appointments
                </Link>
                <Link to="/doctors" className="btn btn-primary fw-semibold">
                  View Doctors
                </Link>
              </div>
            </>
          )}

          {authUser?.role === "user" && (
            <>
              <div className="d-flex gap-3 flex-wrap">
                <div className="text-white fw-bold d-flex align-items-center">
                  User Dashboard
                </div>
                <Link
                  to="/user/dashboard"
                  className="btn btn-primary fw-semibold"
                >
                  View Appointments
                </Link>
                <Link to="/doctors" className="btn btn-primary fw-semibold">
                  View Doctors
                </Link>
              </div>
            </>
          )}
        </ul>

        <ul className="navbar-nav">
          {authUser ? (
            <>
              <li className="nav-item">
                <div className=" me-3 text-white d-flex align-items-center fw-bold">
                  Hi, {authUser.name}
                </div>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
