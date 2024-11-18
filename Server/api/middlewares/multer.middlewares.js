import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {    
    if (file.fieldname === "file") {
      if (!fs.existsSync("public/download")) fs.mkdirSync("public/download");
      cb(null, "public/download");
    } else if (file.fieldname === "image") {
      if (!fs.existsSync("public/temp")) fs.mkdirSync("public/temp");
      cb(null, "public/temp");
    } else if (file.fieldname === "thumbnail") {
      if (!fs.existsSync("public/temp")) fs.mkdirSync("public/temp");
      cb(null, "public/temp");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

export const upload = multer({ storage: storage });
