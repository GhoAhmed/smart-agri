const mongoose = require("mongoose");

const valveSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, trim: true }, // e.g. "Field A - North"
    isOpen: { type: Boolean, default: false }, // true = water flowing
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Valve", valveSchema);
