const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["farmer", "admin"],
    default: "farmer",
  },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", userSchema);
