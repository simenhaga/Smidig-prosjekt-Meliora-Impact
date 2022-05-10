import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  type: [{ type: String }],
  description: String,
});

export const Category = mongoose.model("Category", categorySchema);
