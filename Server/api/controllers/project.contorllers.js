import { cloudinaryFileUpload } from "../utils/cloudinary.js";
import { createProjectModel } from "../model/projectUplode.model.js";
import { customErrorHandel } from "../utils/customErrorHandel.js";
import { resizeImage } from "../utils/imageResize.js";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


export const createProject = async (req, res, next) => {
  const { title, git, liveview, category: rawCategory } = req.body;
  const { files } = req;
  const category = rawCategory?.toLowerCase();
  let resizedImagePath = [];
  const [images, thumbnail, file] = [files?.image || null, files?.thumbnail ? files?.thumbnail[0] : null, files?.file[0] || null];  

  // Helper to clean up original and resized files
  const cleanupFiles = () => {    
    try {      
      images.forEach(image => fs.unlinkSync(image.path));
      thumbnail && fs.unlinkSync(thumbnail.path);
      file && fs.unlinkSync(file.path);
    } catch (err) {
      console.warn("File cleanup warning:", err.message);
    }
  };

  try {
    if (!title || !category || !images?.length) {
      cleanupFiles();
      return next(
        customErrorHandel(400, "Title, category, and image are required.")
      );
    }    

    // Resize each file before uploading
    resizedImagePath = await Promise.all(
      images
        .filter(Boolean)
        .map(image => resizeImage(image.path))
    );
    const resizedThumbPath = thumbnail ? await resizeImage(thumbnail.path) : null;   

    // Upload resized files to Cloudinary
    const [uploadedImage, uploadedThumbnail, uploadedFile] = await Promise.all([
      resizedImagePath?.forEach(image => cloudinaryFileUpload(image)),
      resizedThumbPath ? cloudinaryFileUpload(resizedThumbPath) : null,
      file && cloudinaryFileUpload(file.path)
    ]);

    // Save to database
    const project = await createProjectModel.create({
      title,
      git,
      liveview,
      category,
      thumbnail: uploadedThumbnail,
      file: uploadedFile,
      image: uploadedImage,
    });

    return res.status(200).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    cleanupFiles();
    return next(customErrorHandel(500, "Something went wrong while creating the project."));
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
