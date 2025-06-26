const express = require("express");
const router = express.Router();

const {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);

router.post("/", authMiddleware, roleMiddleware("admin"), createDoctor);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateDoctor);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteDoctor);

module.exports = router;
