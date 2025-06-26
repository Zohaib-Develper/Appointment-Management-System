const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use("/api/auth", userRoutes);

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
