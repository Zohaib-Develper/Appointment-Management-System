import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { Spin } from "antd";

const DoctorIndex = () => {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const handleCardClick = (id) => {
    navigate(`/doctors/${id}`);
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
              onClick={() => handleCardClick(doctor._id)}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorIndex;
