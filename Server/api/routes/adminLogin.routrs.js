import express from "express";
export const adminLoginRoutrs = express();
import { adminlogin, resetFile } from "../controllers/adminlogin.js";
import { deviceAuth } from "../middlewares/auth.middlewares.js";

// login route
adminLoginRoutrs.post("/login", deviceAuth, adminlogin);

// reset route
adminLoginRoutrs.get("/reset", deviceAuth, resetFile);
