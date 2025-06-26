import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../axios";
import { Card, Spin } from "antd";

const DoctorShow = () => {
  const { id } = useParams();
  const { authUser } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(`/doctors/${id}`);
        setDoctor(data.data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <Spin size="large" />;

  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div className="container mt-4">
      <Card className="shadow p-4">
        <h2>{doctor.name}</h2>
        <p>
          <strong>Specialty:</strong> {doctor.specialty}
        </p>
        <p>
          <strong>Location:</strong> {doctor.location}
        </p>
        <p>
          <strong>Contact:</strong> {doctor.contact}
        </p>

        <h5>Availability:</h5>
        <ul className="list-group mb-3">
          {doctor.availability.map((slot, index) => (
            <li key={index} className="list-group-item">
              {slot.day}: {slot.from} - {slot.to}
            </li>
          ))}
        </ul>

        {authUser?.role === "user" && (
          <button className="btn btn-primary">Book Appointment</button>
        )}
        {!authUser && (
          <p className="text-muted">Login as a user to book an appointment</p>
        )}
      </Card>
    </div>
  );
};

export default DoctorShow;
