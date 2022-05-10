import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  orgNr: { type: Number, required: true },
  type: { type: String, enum: ["NON-PROFIT", "CUSTOMER"]},
  description: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  type: {
    type: String,
    enum: ["non-profit", "customer"],
    required: true,
    lowercase: true,
  },
});

export const Company = mongoose.model("Company", companySchema);
