import mongoose from "mongoose";

// ******************************
// model create for project uplode
// ******************************
const createProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Fixed 'require' to 'required'
      trim: true,
      maxLength: [100, "Title cannot exceed 100 characters"]
    },
    git: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v); // Validates URL format if provided
        },
        message: "Git URL must be a valid URL"
      }
    },
    liveview: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Live view URL must be a valid URL"
      }
    },
    category: {
      type: String,
      required: true
    },
    file: {
      public_id: String,
      url: {
        type: String,
        required: true
      }
    },
    thumbnail: {
      public_id: String,
      url: {
        type: String,
      }
    },
    image: {
      public_id: String,
      url: {
        type: String,
        required: true
      }
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add indexes for common queries
createProjectSchema.index({ category: 1 });
createProjectSchema.index({ title: 'text' });

export const createProjectModel = mongoose.model(
  "Project",
  createProjectSchema
);
