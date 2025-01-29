import database from "./database/connection.js";
import 'dotenv/config'
database();

import express from "express";
import cors from "cors";
import { categoryRoutes } from "./routes/category.routrs.js";
import { errorHandel } from "./middlewares/errorHandel.js";
import { projectRoutes } from "./routes/project.routrs.js";
import { adminLoginRoutrs } from "./routes/adminLogin.routrs.js";

const PORT = process.env.PORT || 8000;
const app = express();

// // ******************************
// // middleware
// // ******************************
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(adminLoginRoutrs);
app.use(categoryRoutes);
app.use(projectRoutes);
app.use(errorHandel);

app.listen(PORT, (res, req) => {
  console.log("server start " + PORT);
});
