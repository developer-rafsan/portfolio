import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promises version for better async handling
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "../../config.js";

// Configuration 
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true // Enable HTTPS
});

export const cloudinaryFileUpload = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    
    // Upload with optimized settings
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      quality: "auto", // Automatic quality optimization
      fetch_format: "auto", // Automatic format optimization
      flags: "attachment", // Preserve file attributes
      timeout: 120000, // Increase timeout for large files
    });

    await fs.unlink(localFilePath); // Async file deletion
    return response;

  } catch (error) {
    // Clean up file even if upload fails
    if (localFilePath) {
      await fs.unlink(localFilePath).catch(() => {}); // Ignore unlink errors
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};