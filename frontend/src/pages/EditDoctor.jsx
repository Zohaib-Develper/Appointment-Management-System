import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFlash } from "../context/FlashContext";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const EditDoctor = () => {
  const { showFlash } = useFlash();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    location: "",
    contact: "",
    availability: [],
  });

  const [day, setDay] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/doctors/${id}`);
        setForm(res.data.data);
      } catch (err) {
        console.error("Error fetching doctor:", err);
        alert("Failed to fetch doctor.");
      }
    };
    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAvailability = () => {
    if (!day || !from || !to) return;
    if (form.availability.some((slot) => slot.day === day)) {
      alert("This day is already added.");
      return;
    }
    setForm({
      ...form,
      availability: [...form.availability, { day, from, to }],
    });
    setDay("");
    setFrom("");
    setTo("");
  };

  const handleDeleteAvailability = (dayToRemove) => {
    setForm({
      ...form,
      availability: form.availability.filter(
        (slot) => slot.day !== dayToRemove
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.availability.length <= 0) {
        showFlash("There must be atleast one availability entry", "error");
        return;
      }
      await axios.put(`/doctors/${id}`, form);
      navigate("/doctors");
      showFlash("Doctor updated!", "success");
    } catch (err) {
      console.error("Error updating doctor:", err);
      alert("Failed to update doctor.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Doctor</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Specialty</label>
          <input
            type="text"
            name="specialty"
            className="form-control"
            required
            value={form.specialty}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            required
            value={form.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            className="form-control"
            required
            value={form.contact}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 border p-3">
          <h5>Availability</h5>
          <div className="d-flex gap-2 align-items-end">
            <select
              className="form-select"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">Select Day</option>
              {daysOfWeek.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input
              type="time"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="form-control"
            />
            <input
              type="time"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddAvailability}
            >
              Add
            </button>
          </div>

          <ul className="list-group mt-3">
            {form.availability.map((slot, idx) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={idx}
              >
                {slot.day}: {slot.from} - {slot.to}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteAvailability(slot.day)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Doctor
        </button>
      </form>
    </div>
  );
};

export default EditDoctor;
