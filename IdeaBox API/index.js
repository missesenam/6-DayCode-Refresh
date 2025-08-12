// import express
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const ideaRoutes = require("./routers/ideasRoutes");
const port = process.env.PORT || 3000;
// app is an instance of express
const app = express();
// middleware to parse JSON
app.use(express.json());

// ideas routes
app.use("/api/ideas", ideaRoutes);

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
