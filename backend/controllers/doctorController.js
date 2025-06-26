const Doctor = require("../models/Doctor");
const catchAsync = require("../utils/catchAsync");

exports.createDoctor = catchAsync(async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Doctor created successfully",
    data: doctor,
  });
});

exports.getAllDoctors = catchAsync(async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json({
    status: "success",
    results: doctors.length,
    data: doctors,
  });
});

exports.getDoctorById = catchAsync(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }
  res.status(200).json({
    status: "success",
    data: doctor,
  });
});

exports.updateDoctor = catchAsync(async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  res.status(200).json({
    status: "success",
    message: "Doctor updated successfully",
    data: doctor,
  });
});

exports.deleteDoctor = catchAsync(async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);
  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  res.status(204).json({
    status: "success",
    message: "Doctor deleted successfully",
    data: null,
  });
});
