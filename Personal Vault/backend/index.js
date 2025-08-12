// import express
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const SecretNoteRoutes = require("./routes/secretNotes");
const RegistrationRoutes = require("./routes/registration");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const port = process.env.PORT || 3000;
// app is an instance of express
const app = express();
// middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/api/note", SecretNoteRoutes);
app.use("/api", RegistrationRoutes);

//  error-handling middleware
app.use(errorHandler);

//connect
mongoose
  .connect(process.env.MONGO_URI)
  .then((resu) => {
    app.listen(port, () =>
      console.log(`the server up and ready on port: ${port}`)
    );
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
