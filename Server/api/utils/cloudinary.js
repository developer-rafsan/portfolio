import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "../../config.js";

// Configuration
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});


export const cloudinaryFileUplode = async (localFilePath) => {
  try {      
    if (!localFilePath) return null;
    const responce = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return responce;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};