import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// Configuration
cloudinary.config({
  cloud_name: 'djuwkvnxo',
  api_key: '996322748538987',
  api_secret: 'RAN6LDdMv69IogfocrE1cT1GqYc',
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
