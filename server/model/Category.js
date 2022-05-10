import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: String,
});

export const Category = mongoose.model("Category", categorySchema);
