import { v2 as cloudinary } from "cloudinary";
import { cloudinaryFileUplode } from "../utils/cloudinary.js";
import { createProjectModel } from "../model/projectUplode.model.js";
import { customErrorHandel } from "../utils/customErrorHandel.js";
import fs from "fs";
import pLimit from "p-limit";

const limit = pLimit(5);

// project create api
export const createProject = async (req, res, next) => {
  try {
    const { title, git, liveview } = req.body;
    const category = req.body.toLowerCase();

    // check title,category and description data
    if (!title || !category || !req.files?.image) {
      req.files?.thumbnail && fs.unlinkSync(req.files?.thumbnail[0]?.path);
      req.files?.file && fs.unlinkSync(req.files?.file[0]?.path);
      req.files?.image &&
        req.files?.image?.map((localpath) => {
          fs.unlinkSync(localpath?.path);
        });
      return next(
        customErrorHandel(
          404,
          "must be requard title, category and image"
        )
      );
    }

    //  thumbnail upload optional
    const thumbnaillocalpath =
      req.files?.thumbnail && req.files?.thumbnail[0]?.path;
    const uplodedthumbnail = await cloudinaryFileUplode(thumbnaillocalpath);

    //  file upload optional
    const filelocalpath = req.files?.file && req.files?.file[0];

    // upload images
    const imagelocalpath = req.files?.image;
    const imagesToUpload = imagelocalpath?.map((image) => {
      return limit(async () => {
        const result = await cloudinaryFileUplode(image.path);
        return result;
      });
    });

    let uploads = await Promise.all(imagesToUpload);

    for (let i = 0; i < uploads.length; i++) {
      if (!uploads[i])
        return next(customErrorHandel(404, "server error place try late"));
    }

    // stor mongodb databash
    const responceProject = await createProjectModel.create({
      title,
      git,
      liveview,
      category,
      thumbnail: uplodedthumbnail,
      file: filelocalpath,
      image: [...uploads],
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "project created success",
    });
  } catch (error) {
    req.files?.thumbnail && fs.unlinkSync(req.files?.thumbnail[0]?.path);
    req.files?.file && fs.unlinkSync(req.files?.file[0]?.path);
    req.files?.image &&
      req.files?.image?.map((localpath) => {
        fs.unlinkSync(localpath?.path);
      });
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
      sortQuery.date = -1;
    } else {
      sortQuery.date = 1;
    }

    // find project query data
    const project = await createProjectModel
      .find(query)
      .skip(page * limit)
      .limit(limit)
      .sort(sortQuery);

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

    // cloudinary thumbnail image delete
    await cloudinary.uploader
      .destroy(findProject.thumbnail[0].public_id, {
        type: "upload",
      })
      .then(console.log);

    // cloidinary raw file delete
    findProject?.file && fs.unlinkSync(findProject?.file?.path)

    // cloudinary thumbnail image delete
    for (let i = 0; i < findProject.image.length; i++) {
      await cloudinary.uploader
        .destroy(findProject.image[i].public_id, {
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

export const downloadFile = async(req, res, next) => {
  let _id = req.params.id;
  const downloadProject = await createProjectModel.findById({ _id });
  res.download(`${downloadProject?.file?.path}`)
};