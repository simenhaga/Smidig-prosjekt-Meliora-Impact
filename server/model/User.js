import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  googleToken: String,
  email: { type: String, lowercase: true },
  created: { type: Date, default: Date.now, required: true, immutable: true },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
