const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware);

router.post("/", roleMiddleware("user"), bookAppointment);

router.get("/", roleMiddleware("user", "admin"), getAppointments);

router.patch("/:id/status", roleMiddleware("admin"), updateAppointmentStatus);

module.exports = router;
