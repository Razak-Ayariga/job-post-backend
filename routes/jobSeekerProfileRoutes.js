import express from "express";
const router = express.Router();

import { createProfile, updateProfile } from "../controllers/jobSeekerProfileController.js";
import { verifyToken } from "../middleware/jobseekerAuthMiddleware.js";
import ProfileValidator from "../validators/jobseekerProfileValidator.js";
import photoUpload from "../middleware/ProfileMiddleware.js";

router.post(
  "/profile",
  verifyToken,
  photoUpload("public/photos").single("photo"),
  ProfileValidator,
  createProfile
);

router.put("/updateProfile/:id",
  photoUpload("public/photos").single("photo"),
  updateProfile
);

export default router;
