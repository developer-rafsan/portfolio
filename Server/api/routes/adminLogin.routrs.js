import express from "express";
export const adminLoginRoutrs = express();
import { adminlogin, resetFile } from "../controllers/adminlogin.js";

// login route for admin
adminLoginRoutrs.post("/login", adminlogin);

adminLoginRoutrs.get('/reset', resetFile)