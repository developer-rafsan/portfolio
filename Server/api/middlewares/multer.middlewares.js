import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "file") {
      cb(null, "public/download");
    } else if (file.fieldname === "image") {
      cb(null, "public/temp");
    } else if (file.fieldname === "thumbnail") {
      cb(null, "public/temp");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

export const upload = multer({ storage: storage });
