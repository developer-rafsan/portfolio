import mongoose from "mongoose";

// ******************************
// model create for Category uplode
// ******************************
const createCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    require: [true, "category must be required"],
    trim: true,
  },
});

export const createCategoryModel = mongoose.model(
  "Category",
  createCategorySchema
);
