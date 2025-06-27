import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const UserDashboard = () => {
  const { authUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/appointments");
        setAppointments(res.data.data || []);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Welcome, {authUser?.name || "User"}!</h2>

      <div className="mb-4">
        <Link to="/doctors" className="btn btn-primary">
          Browse Doctors
        </Link>
      </div>

      <h4>Your Appointments</h4>

      {loading ? (
        <div className="text-center mt-4">
          <Spin size="large" />
        </div>
      ) : appointments.length === 0 ? (
        <div className="alert alert-info mt-3">You have no appointments.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id}>
                  <td>{appt.doctorId?.name || "N/A"}</td>
                  <td>{new Date(appt.date).toLocaleDateString()}</td>
                  <td>{appt.time}</td>
                  <td>{appt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
