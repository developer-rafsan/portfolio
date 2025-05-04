import express from "express";
export const adminLoginRoutrs = express();
import { adminlogin, resetFile } from "../controllers/adminlogin.js";

// login route
adminLoginRoutrs.post("/login", adminlogin);

// reset route
adminLoginRoutrs.get("/reset", resetFile);
