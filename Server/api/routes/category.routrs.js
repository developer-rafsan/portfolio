import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../controllers/category.contorllers.js";

export const categoryRoutes = express();

// create category
categoryRoutes.post("/create-category", createCategory);

// get all category
categoryRoutes.get("/getCategory", getAllCategory);

// delete category
categoryRoutes.delete("/delete-category/:id", deleteCategory);
