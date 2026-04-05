const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const productManagementRoutes = require("./routes/productManagementRoutes");
const getProductRoutes = require("./routes/getProductRoutes");
const createOrderRoutes = require("./routes/createOrderRoutes");
const salesRoutes = require("./routes/salesRoutes");
const manageOrderRoutes = require("./routes/manageOrdersRoutes");
const { connectToDatabase } = require("./config/dbConnection");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Connect to the database
connectToDatabase();

// API routes
app.use("/api", productManagementRoutes);
app.use("/api", getProductRoutes);
app.use("/api", createOrderRoutes);
app.use("/api", salesRoutes);
app.use("/api", manageOrderRoutes);

// REMOVE the uploads static line - not needed anymore with Cloudinary

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to CBH API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));