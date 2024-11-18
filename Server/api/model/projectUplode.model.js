import mongoose from "mongoose";

// ******************************
// model create for project uplode
// ******************************
const createProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title must be required"],
      trim: true,
    },
    git: {
      type: String,
    },
    liveview: {
      type: String,
    },
    category: {
      type: String,
    },
    file: {
      type: Object,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const createProjectModel = mongoose.model(
  "Project",
  createProjectSchema
);
