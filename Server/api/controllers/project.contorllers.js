import { cloudinaryFileUplode } from "../utils/cloudinary.js";
import { createProjectModel } from "../model/projectUplode.model.js";
import { customErrorHandel } from "../utils/customErrorHandel.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// project create api
export const createProject = async (req, res, next) => {
  try {
    const { title, git, liveview } = req.body;

    const category = req.body.category.toLowerCase();

    // check title,category and description data
    if (!title || !category || !req.files?.image) {
      req.files?.thumbnail && fs.unlinkSync(req.files?.thumbnail[0]?.path);
      req.files?.file && fs.unlinkSync(req.files?.file[0]?.path);
      req.files?.image && fs.unlinkSync(req.files?.image[0]?.path);
      return next(
        customErrorHandel(404, "must be requard title, category and image")
      );
    }

    //  thumbnail upload optional
    const thumbnaillocalpath =
      req.files?.thumbnail && req.files?.thumbnail[0]?.path;
    const uplodedthumbnail = await cloudinaryFileUplode(thumbnaillocalpath);

    //  file upload optional
    const filelocalpath = req.files?.file && req.files?.file[0];

    // upload images
    const imagelocalpath = req.files?.image && req.files?.image[0]?.path;
    const uplodedImage = await cloudinaryFileUplode(imagelocalpath);

    // stor mongodb databash
    const responceProject = await createProjectModel.create({
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
    req.files?.thumbnail && fs.unlinkSync(req.files?.thumbnail[0]?.path);
    req.files?.file && fs.unlinkSync(req.files?.file[0]?.path);
    req.files?.image && fs.unlinkSync(req.files?.image[0]?.path);
    return next(customErrorHandel());
  }
};

// get filter project and all project
export const projectData = async (req, res, next) => {
  try {
    const page = req.query.page - 1 || 0;
    const limit = req.query.limit || 10;
    const search = req.query.search || "";
    const category = req.query.category.toLowerCase() || "All";
    const sort = req.query.sort || "asc";

    // search query
    const query = {
      title: { $regex: search, $options: "i" },
    };

    // filter by category
    if (category !== "all") query.category = category;

    // node ase sort and dsc sort query
    const sortQuery = {};

    if (sort === "asc") {
      sortQuery.createdAt = 1;
    } else {
      sortQuery.createdAt = -1;
    }

    // find project query data
    const project = await createProjectModel
      .find(query)
      .skip(page * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // count total project
    const total = await createProjectModel.countDocuments(query);

    // response data
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "project get success",
      total,
      limit,
      data: project,
    });
  } catch (error) {
    return next(customErrorHandel());
  }
};

// delete project
export const deleteProject = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const findProject = await createProjectModel.findById({ _id });

    if (!findProject) return next(customErrorHandel(402, "project not found"));

    if (findProject.thumbnail) {
      await cloudinary.uploader
        .destroy(findProject.thumbnail?.public_id, {
          type: "upload",
        })
        .then(console.log);
    }

    // cloidinary raw file delete
    if (findProject.file) {
      fs.unlinkSync(findProject.file?.path);
    }

    if (findProject.image) {
      await cloudinary.uploader
        .destroy(findProject.image?.public_id, {
          type: "upload",
        })
        .then(console.log);
    }

    await createProjectModel.findByIdAndDelete({ _id });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "project delete success",
    });
  } catch (error) {
    return next(customErrorHandel());
  }
};

export const downloadFile = async (req, res, next) => {
  let _id = req.params.id;
  const downloadProject = await createProjectModel.findById({ _id });
  res.download(`${downloadProject?.file?.path}`);
};
