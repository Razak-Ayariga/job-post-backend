import cloudinary, { uploader } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const cloudinaryConfig = () =>
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});


export { cloudinaryConfig, uploader };
