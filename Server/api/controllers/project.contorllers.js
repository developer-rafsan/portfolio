import { cloudinaryFileUpload } from "../utils/cloudinary.js";
import { createProjectModel } from "../model/projectUplode.model.js";
import { customErrorHandel } from "../utils/customErrorHandel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// project create api
export const createProject = async (req, res, next) => {
  try {
    const { title, git, liveview, category: rawCategory } = req.body;
    const { files } = req;
    const category = rawCategory.toLowerCase();

    // Helper function to clean up uploaded files
    const cleanupFiles = () => {
      files?.thumbnail && fs.unlinkSync(files.thumbnail[0].path);
      files?.file && fs.unlinkSync(files.file[0].path);
      files?.image && fs.unlinkSync(files.image[0].path);
    };

    // Validate required fields
    if (!title || !category || !files?.image) {
      cleanupFiles();
      return next(
        customErrorHandel(404, "must be requard title, category and image")
      );
    }

    // Handle file uploads
    const [uplodedthumbnail, uplodedImage] = await Promise.all([
      files?.thumbnail && cloudinaryFileUpload(files.thumbnail[0].path),
      files?.image && cloudinaryFileUpload(files.image[0].path)
    ]);

    const filelocalpath = files?.file && files.file[0];

    // Create project in database
    await createProjectModel.create({
      title,
      git,
      liveview,
      category,
      thumbnail: uplodedthumbnail,
      file: filelocalpath,
      image: uplodedImage,
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "project created success",
    });
  } catch (error) {
    cleanupFiles();
    return next(customErrorHandel());
  }
};

// get filter project and all project
export const projectData = async (req, res, next) => { 
  try {
    const { page = 1, limit = 10, search = "", category = "All" } = req.query;
    const skip = (page - 1) * limit;
    const normalizedCategory = category.toLowerCase();    

    // Build query object for search and category filter
    const query = {
      title: { $regex: search, $options: "i" }, // Case-insensitive search by title
    };

    if (normalizedCategory !== "all") query.category = normalizedCategory;
    
console.log(query);

    // Execute queries in parallel
    const project = await createProjectModel
      .find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      total: project.length,
      limit: Number(limit),
      data: project,
    });
  } catch (error) {
    console.log(error);
    
    return next(customErrorHandel());
  }
};

// file download api
export const downloadFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const downloadProject = await createProjectModel.findById(id);

    if (!downloadProject?.file?.path) {
      return next(customErrorHandel(404, "File not found"));
    }

    res.download(downloadProject.file.path);
  } catch (error) {
    return next(customErrorHandel());
  }
};

// delete project
export const deleteProject = async (req, res, next) => {
  const { id: _id } = req.params;

  try {
    const findProject = await createProjectModel.findById(_id);

    if (!findProject) {
      return next(customErrorHandel(402, "project not found"));
    }

    // Delete thumbnail from cloudinary if exists
    if (findProject.thumbnail?.length && findProject.thumbnail?.public_id) {
      await cloudinary.uploader.destroy(findProject.thumbnail.public_id, {
        type: "upload",
      });
    }

    // Delete local file if exists
    if (findProject.file?.path && findProject.file?.filename) {
      const filePath = `public/download/${findProject.file.filename}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete image from cloudinary if exists
    if (findProject.image?.public_id) {
      await cloudinary.uploader.destroy(findProject.image.public_id, {
        type: "upload",
      });
    }

    await createProjectModel.findByIdAndDelete(_id);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "project delete success",
    });
  } catch (error) {
    return next(customErrorHandel());
  }
};
