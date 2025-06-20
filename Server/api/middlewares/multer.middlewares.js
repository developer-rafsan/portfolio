import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {  
    const baseDir = "public";
    const uploadDir = "temp";
    const fullPath = `${baseDir}/${uploadDir}`;
    

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB limit
};

export const upload = multer({ 
  storage: storage,
  limits: limits
});
