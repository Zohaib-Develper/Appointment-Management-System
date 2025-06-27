const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const catchAsync = require("../utils/catchAsync");

exports.bookAppointment = catchAsync(async (req, res) => {
  const { doctorId, date, time } = req.body;
  const userId = req.user._id;

  const appointmentDate = new Date(date);
  appointmentDate.setHours(0, 0, 0, 0);
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  const appointmentDay = appointmentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const availableSlot = doctor.availability.find(
    (slot) => slot.day === appointmentDay
  );

  if (!availableSlot) {
    return res
      .status(400)
      .json({ message: `Doctor is not available on ${appointmentDay}` });
  }

  const [fromHour, fromMin] = availableSlot.from.split(":").map(Number);
  const [toHour, toMin] = availableSlot.to.split(":").map(Number);
  const [bookHour, bookMin] = time.split(":").map(Number);

  const bookingMinutes = bookHour * 60 + bookMin;
  const fromMinutes = fromHour * 60 + fromMin;
  const toMinutes = toHour * 60 + toMin;

  if (bookingMinutes < fromMinutes || bookingMinutes >= toMinutes) {
    return res
      .status(400)
      .json({ message: "Selected time is outside of doctor's availability" });
  }

  const existing = await Appointment.findOne({
    doctorId,
    date: appointmentDate,
    time,
    status: { $ne: "cancelled" },
  });

  if (existing) {
    return res
      .status(400)
      .json({ message: "This time slot is already booked" });
  }

  const appointment = await Appointment.create({
    userId,
    doctorId,
    date: appointmentDate,
    time,
  });

  res.status(201).json({
    message: "Appointment booked successfully",
    data: appointment,
  });
});

exports.getAppointments = catchAsync(async (req, res) => {
  let filter = {};

  if (req.user.role === "user") {
    filter.userId = req.user._id;
  }

  const appointments = await Appointment.find(filter)
    .populate("doctorId", "name specialty contact")
    .populate("userId", "name email");

  res.status(200).json({
    data: appointments,
  });
});

exports.updateAppointmentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["pending", "confirmed", "cancelled"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  res.status(200).json({
    message: "Appointment status updated",
    data: appointment,
  });
});
