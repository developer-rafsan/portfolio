import express from "express";
export const projectRoutes = express();

import { upload } from "../middlewares/multer.middlewares.js";
import {
  createProject,
  deleteProject,
  downloadFile,
  projectData
} from "../controllers/project.contorllers.js";

// create poject router for admin
projectRoutes.post(
  "/create-project",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
    { name: "image", maxCount: 5 },
  ]),
  createProject
);

// get all project
projectRoutes.get("/project", projectData);

// delete project for admin
projectRoutes.delete("/project/:id", deleteProject);

// get download file
projectRoutes.get("/download/:id", downloadFile);
