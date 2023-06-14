import multer from "multer";
import path from "path";
const absolutePath = path.resolve("./");
import cloudinary from  "../cloudinary/cloudinary.js";


const uploadCvMiddleware = (destination) => {
  const directory = path.join(absolutePath, destination);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directory);
    },
    filename: function (req, file, cb) {
      const filename =
        file.fieldname + "_" + Date.now() + path.extname(file.originalname);
      cb(null, filename);
    }
  });

  const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (
      (extension === ".pdf" && file.mimetype === "application/pdf") ||
      (extension === ".docx" &&
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF files are allowed."));
    }
    return;
  };

  const upload = multer({ storage, fileFilter });

  const cloudinaryUpload = (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, (result, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });
    });
  };
  return {upload, cloudinaryUpload};
};

export default uploadCvMiddleware;
