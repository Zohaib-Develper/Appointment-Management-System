const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

mongoose
  .connect(
    process.env.DATABASE_URL ||
      "mongoose.connect('mongodb://127.0.0.1:27017/appointment_system_db')"
  )
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log("Error Connecting DB: ", err.message));

app.use(errorHandler);
