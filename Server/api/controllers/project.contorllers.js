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
    if (!title || !category || !files?.image.length) {
      cleanupFiles();
      return next(
        customErrorHandel(404, "must be requard title, category and image")
      );
    }

    // Handle file uploads
    const [uplodedthumbnail, uplodedImage, uploadFile] = await Promise.all([
      files?.thumbnail && cloudinaryFileUpload(files.thumbnail[0].path),
      files?.image && cloudinaryFileUpload(files.image[0].path),
      files?.file && cloudinaryFileUpload(files.file[0].path)
    ]);    

    // Create project in database
    const project = await createProjectModel.create({
      title,
      git,
      liveview,
      category,
      thumbnail: uplodedthumbnail,
      file: uploadFile,
      image: uplodedImage,
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "project created success",
      project,
    });
  } catch (error) {
    // Helper function to clean up uploaded files
    const cleanupFiles = () => {
      files?.thumbnail && fs.unlinkSync(files.thumbnail[0].path);
      files?.file && fs.unlinkSync(files.file[0].path);
      files?.image && fs.unlinkSync(files.image[0].path);
    };
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
    const query = {};

    // Build query for search and category filter
    if (search?.trim()) {
      query.title = { $regex: search.trim(), $options: "i" };
    }

    if (normalizedCategory !== "all") {
      query.category = normalizedCategory;
    }

    // Get total count and paginated data in parallel for optimization
    const [total, projects] = await Promise.all([
      createProjectModel.countDocuments(query),
      createProjectModel
        .find(query)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort({ createdAt: -1 })
        .lean()
    ]);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      total,
      limit: Number(limit),
      data: projects,
    });
  } catch (error) {    
    return next(customErrorHandel());
  }
};

// file download api
export const downloadFile = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const findProject = await createProjectModel.findById(_id);    
    
    const downloadUrl = cloudinary.url(findProject?.file.url, {
      resource_type: "auto",
      flags: "attachment",
      secure: true
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      downloadUrl,
    });
  } catch (error) {
    console.log(error);
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

    // Delete image from cloudinary if exists
    if (findProject.image?.public_id) {
      await cloudinary.uploader.destroy(findProject.image.public_id, {
        type: "upload",
      });
    }

    // Delete image from cloudinary if exists
    if(findProject.file?.length && findProject.file?.public_id) {
      await cloudinary.uploader.destroy(findProject.file.public_id, {
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
