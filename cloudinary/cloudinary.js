// import dotenv from 'dotenv';
// dotenv.config();
// import { cloudinary, uploader } from "cloudinary";
// import uploadCvRoutes from "./routes/uploadCvRoutes.js";


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_APIKEY,
//   api_secret: process.env.CLOUDINARY_APISECRET
// });

// app.use("/cv", cloudinary.uploader.upload().single("cv"), uploadCvRoutes);

// export { cloudinary, uploader };
import { cloudinary, uploader } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const cloudinaryConfig = (req, res, next) =>
  cloudinary({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET,
  });
export { cloudinaryConfig, uploader };
