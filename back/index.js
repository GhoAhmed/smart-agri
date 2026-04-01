require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const valveRoutes = require("./routes/valveRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:4200", "https://yourfrontenddomain.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

connectDB();

app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", valveRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
