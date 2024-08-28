import mongoose from "mongoose";

// ******************************
// model create for project uplode
// ******************************
const createProjectSchema = new mongoose.Schema({
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
  description: {
    type: String,
    require: [true, "description must be required"],
  },
  file: [
    {
      public_id: {
        type: String,
      },
      format: {
        type: String,
      },
      secure_url: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  thumbnail: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  image: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  auther: {
    type: String,
    default: "Jahid Islam Rafsan",
  },
  date: {
    type: String,
    default: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} `,
  },
});

export const createProjectModel = mongoose.model(
  "Project",
  createProjectSchema
);
