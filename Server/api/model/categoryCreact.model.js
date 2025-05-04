import mongoose from "mongoose";

// ******************************
// model create for Category uplode
// ******************************
const createCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true, // Fixed 'require' to 'required'
    trim: true,
    unique: true, // Ensure categories are unique
    maxLength: [50, "Category name cannot exceed 50 characters"],
    minLength: [2, "Category name must be at least 2 characters"]
  }
}, {
  timestamps: true, // Add timestamps for tracking
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add index for faster queries
createCategorySchema.index({ category: 1 }, { unique: true });

export const createCategoryModel = mongoose.model(
  "Category", 
  createCategorySchema
);
