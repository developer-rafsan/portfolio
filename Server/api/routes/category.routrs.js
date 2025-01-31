import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../controllers/category.contorllers.js";
import { deviceAuth } from "../middlewares/auth.middlewares.js";

export const categoryRoutes = express();

// create category
categoryRoutes.post("/create-category", deviceAuth, createCategory);

// get all category
categoryRoutes.get("/getCategory", getAllCategory);

// delete category
categoryRoutes.delete("/delete-category/:id", deviceAuth, deleteCategory);
