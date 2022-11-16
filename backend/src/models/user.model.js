
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firtsName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("user", userSchema);
