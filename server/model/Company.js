import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  orgNr: { type: Number, required: true },
  type: { type: String, enum: ["NON-PROFIT", "CUSTOMER"], required: true, lowercase: true},
  description: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

export const Company = mongoose.model("Company", companySchema);
