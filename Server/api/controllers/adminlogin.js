import { EMAIL, PASSWORD } from "../../config.js";
import { createProjectModel } from "../model/projectUplode.model.js";
import { customErrorHandel } from "../utils/customErrorHandel.js";
import fs from "fs";

// login admin plane for admin
export const adminlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return next(customErrorHandel(400, "Email and password are required"));
    }

    // Check credentials
    if (EMAIL !== email || PASSWORD !== password) {
      return next(customErrorHandel(401, "Invalid credentials"));
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Login successful"
    });

  } catch (error) {
    return next(customErrorHandel());
  }
};

// cline up file
export const resetFile = async (req, res, next) => {
  try {
    // Get all project filenames from database
    const projects = await createProjectModel.find().select('file.filename').lean();
    const databaseFilenames = projects.map(project => project.file?.filename).filter(Boolean);

    // Get all files in download directory
    const downloadFiles = fs.readdirSync("public/download");

    // Find files that exist in directory but not in database
    const unusedFiles = downloadFiles.filter(file => !databaseFilenames.includes(file));

    // Delete unused files from download directory
    if (unusedFiles.length) {
      await Promise.all(
        unusedFiles.map(file => fs.promises.unlink(`public/download/${file}`))
      );
    }

    // Clean temp directory
    const tempFiles = fs.readdirSync("public/temp");
    await Promise.all(
      tempFiles.map(file => fs.promises.unlink(`public/temp/${file}`))
    );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cleaned extra files successfully",
      filesRemoved: unusedFiles
    });

  } catch (error) {
    return next(customErrorHandel());
  }
};
