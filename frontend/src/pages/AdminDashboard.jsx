import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useFlash } from "../context/FlashContext";
import { Spin } from "antd";

const AdminDashboard = () => {
  const { authUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showFlash } = useFlash();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const apptRes = await axios.get("/appointments");
      setAppointments(apptRes.data.data || []);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.patch(`/appointments/${appointmentId}/status`, {
        status: newStatus,
      });
      showFlash("Appointment status updated", "success");
      fetchAppointments();
    } catch (err) {
      console.error("Error updating status:", err);
      showFlash("Failed to update appointment status", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Welcome, {authUser?.name || "Admin"}!</h2>
      {loading ? (
        <div className="text-center mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <h4 className="mt-4">All Appointments</h4>
          {appointments.length === 0 ? (
            <div className="alert alert-warning">No appointments found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped mt-3">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt._id}>
                      <td>{appt.userId?.name || "N/A"}</td>
                      <td>{appt.doctorId?.name || "N/A"}</td>
                      <td>{new Date(appt.date).toLocaleDateString()}</td>
                      <td>{appt.time}</td>
                      <td>{appt.status}</td>
                      <td>
                        <select
                          className="form-select"
                          value={appt.status}
                          onChange={(e) =>
                            handleStatusChange(appt._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
