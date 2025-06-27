import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import { Spin } from "antd";
import { useFlash } from "../context/FlashContext";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const { showFlash } = useFlash();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todayStr, setTodayStr] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/doctors/${doctorId}`);
        setDoctor(res.data.data);
      } catch (err) {
        console.error("Error fetching doctor", err);
        showFlash("Failed to load doctor details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    setTodayStr(formattedToday);
  }, [doctorId]);

  const getDayOfWeek = (dateStr) => {
    const day = new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
    });
    return day;
  };

  const generateTimeSlots = (from, to) => {
    const [fromHour, fromMin] = from.split(":").map(Number);
    const [toHour, toMin] = to.split(":").map(Number);

    let fromTotalMins = fromHour * 60 + fromMin;
    let toTotalMins = toHour * 60 + toMin;

    if (toTotalMins <= fromTotalMins) {
      toTotalMins += 24 * 60;
    }

    const slots = [];
    for (let mins = fromTotalMins; mins < toTotalMins; mins += 30) {
      const h = Math.floor((mins % (24 * 60)) / 60);
      const m = mins % 60;
      const formatted = `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}`;
      slots.push(formatted);
    }

    return slots;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setTime("");

    const dayOfWeek = getDayOfWeek(selectedDate);
    const slot = doctor.availability.find((s) => s.day === dayOfWeek);

    if (slot) {
      const times = generateTimeSlots(slot.from, slot.to);
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) return showFlash("Please select date and time", "info");

    try {
      const res = await axios.post("/appointments", {
        doctorId,
        date,
        time,
      });

      showFlash("Appointment booked successfully!", "success");
      navigate("/user/dashboard");
    } catch (err) {
      console.error("Booking error", err);
      showFlash(
        err.response?.data?.message || "Failed to book appointment",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spin size="large" />
      </div>
    );
  }

  if (!doctor) {
    return <div className="alert alert-danger">Doctor not found</div>;
  }

  return (
    <div className="container mt-5 card p-4 shadow-sm">
      <h4 className="mb-4">Book Appointment with {doctor.name}</h4>
      <h5>Availability:</h5>
      <ul className="list-group mb-3">
        {doctor.availability.map((slot, index) => (
          <li key={index} className="list-group-item">
            {slot.day}: {slot.from} - {slot.to}
          </li>
        ))}
      </ul>
      <h5>Book Appointment:</h5>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-3">
          <label className="form-label">Select Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={handleDateChange}
            min={todayStr}
            required
          />
        </div>

        {availableTimes.length > 0 ? (
          <div className="mb-3">
            <label className="form-label">Select Time</label>
            <select
              className="form-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="">-- Select Time --</option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        ) : (
          date && (
            <div className="alert alert-warning">
              Doctor is not available on selected date
            </div>
          )
        )}

        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
