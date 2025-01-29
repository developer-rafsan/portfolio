import express from "express";
export const adminLoginRoutrs = express();
import { adminlogin, deleteProject, resetFile } from "../controllers/adminlogin.js";

// login route for admin
adminLoginRoutrs.post("/login", adminlogin);

adminLoginRoutrs.get('/reset', resetFile)

// delete project for admin
adminLoginRoutrs.delete("/project/:id", deleteProject);