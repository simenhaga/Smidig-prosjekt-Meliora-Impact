import mongoose, { Schema } from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  orgNr: { type: Number, required: true },
  description: String,
  categoryList: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

export const Company = mongoose.model("Company", companySchema);
