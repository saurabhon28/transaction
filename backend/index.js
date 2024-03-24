const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transactionData = require("./routes/transaction");

const app = express();
const PORT = 5000;
require("dotenv").config();
app.use(cors());

//Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//api endpoint
app.use("/api", transactionData);

//Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
