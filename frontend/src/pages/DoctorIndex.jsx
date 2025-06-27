import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../axios";
import { Spin } from "antd";
import { useFlash } from "../context/FlashContext";

const DoctorIndex = () => {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { showFLash } = useFlash();
  const { authUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("/doctors");
        setDoctors(res.data.data);
        setFiltered(res.data.data);
      } catch (err) {
        console.error("Error fetching doctors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredDoctors = doctors.filter((doc) =>
      doc.specialty.toLowerCase().includes(value)
    );
    setFiltered(filteredDoctors);
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const res = await axios.delete(`/doctors/${doctorId}`);
      showFLash("Doctor deleted successfully", "success");
    } catch (error) {
      console.error("Error fetching doctor:", error);
      showFLash(
        err.response?.data?.message || "Error: unable to delete doctor",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Doctor Directory</h2>

      <div className="mb-3">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="form-control"
          placeholder="Search by specialty..."
        />
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spin size="large" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="alert alert-info">No doctors found.</div>
      ) : (
        <div className="row">
          {filtered.map((doctor) => (
            <div
              className="col-md-4 mb-4"
              key={doctor._id}
              style={{ cursor: "pointer" }}
            >
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{doctor.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {doctor.specialty}
                  </h6>
                  <p className="card-text">
                    <strong>Location:</strong> {doctor.location}
                    <br />
                    <strong>Contact:</strong> {doctor.contact}
                  </p>
                  <div className="card-text">
                    <strong>Availability:</strong>
                    <ul className="mb-0">
                      {doctor.availability.map((slot, idx) => (
                        <li key={idx}>
                          {slot.day}: {slot.from} - {slot.to}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {authUser?.role === "user" && (
                  <button
                    className="btn btn-primary w-50 m-1"
                    onClick={() => {
                      navigate(`book`);
                    }}
                  >
                    Book Appointment
                  </button>
                )}
                {authUser?.role === "admin" && (
                  <div className="d-flex">
                    <button
                      className="btn btn-danger w-25 m-1"
                      onClick={() => handleDeleteDoctor(doctor._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary w-25 m-1"
                      onClick={() => {
                        navigate(`book`);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
                {!authUser && (
                  <p className="text-muted">
                    Login as a user to book an appointment
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorIndex;
