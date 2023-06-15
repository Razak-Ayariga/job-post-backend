import { v2 as cloudinary, uploader } from "cloudinary";
//import { cloudinary, uploader } from "cloudinary";
//import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

const cloudinaryConfig = () =>
  cloudinary({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRETgit
  });

export { cloudinaryConfig, uploader };
