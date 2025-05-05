// Import dependencies
import "dotenv/config";
import express from "express";
import cors from "cors";
import database from "./database/connection.js";
import { categoryRoutes } from "./routes/category.routrs.js";
import { errorHandel } from "./middlewares/errorHandel.js";
import { projectRoutes } from "./routes/project.routrs.js";
import { adminLoginRoutrs } from "./routes/adminLogin.routrs.js";

// Initialize database connection
database().catch(console.error);

// Constants
const PORT = process.env.PORT || 8000;
const app = express();

// Middleware configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Static file serving with caching
app.use(express.static("public", {
  maxAge: '1d',
  etag: true
}));

// Body parser with size limits
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/', [
  adminLoginRoutrs,
  categoryRoutes,
  projectRoutes
]);

// Error handling
app.use(errorHandel);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
