import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CreateDoctor = () => {
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

  const handleAddAvailability = () => {
    if (!day || !from || !to) return;
    if (form.availability.some((a) => a.day === day)) {
      alert("Day already added. Edit or remove it first.");
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

  const handleDeleteAvailability = (dayToDelete) => {
    setForm({
      ...form,
      availability: form.availability.filter((a) => a.day !== dayToDelete),
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/doctors", form);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error creating doctor:", err);
      alert("Failed to create doctor.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Doctor</h3>
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
              required
            />
            <input
              type="time"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="form-control"
              required
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
          Save Doctor
        </button>
      </form>
    </div>
  );
};

export default CreateDoctor;
