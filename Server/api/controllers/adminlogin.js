import { createProjectModel } from "../model/projectUplode.model.js";
import { customErrorHandel } from "../utils/customErrorHandel.js";
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryFileUplode } from "../utils/cloudinary.js";

import fs from "fs";

// login admin plane for admin
export const adminlogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (process.env.EMAIL !== email || process.env.PASSWORD !== password)
      return next(customErrorHandel(402, "invalid credentials"));

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "login suscess",
    });
  } catch (error) {
    return next(customErrorHandel());
  }
};

export const resetFile = async (req, res, next) => {
  const findProject = await createProjectModel.find();
  let databashfilepath = [];
  let allfilepath = [];
  fs.readdirSync("public/download").forEach((file) => {
    allfilepath.push(file);
  });

  findProject.forEach((item) => {
    databashfilepath.push(item.file?.filename);
  });

  const result = allfilepath.filter(function (obj) {
    return databashfilepath.indexOf(obj) == -1;
  });

  if (result.length)
    result?.forEach((item) => fs.unlinkSync(`public/download/${item}`));

  fs.readdirSync("public/temp").forEach((file) => {
    fs.unlinkSync(`public/temp/${file}`);
  });

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "clean extra file",
  });
};
