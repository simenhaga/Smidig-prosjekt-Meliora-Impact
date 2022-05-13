import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  googleToken: String,
  email: { type: String, lowercase: true, unique: true, required: true },
  created: { type: Date, default: Date.now, required: true, immutable: true },
  updated: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
