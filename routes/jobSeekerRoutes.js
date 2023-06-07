import express from "express";
const router = express.Router();

import {
  registerJobSeeker,
  jobSeekerLogin,
  getJobSeeker,
  updateJobSeekerInfo,
  getJobSeekerAllInfo,
  deleteJobSeeker,
  getAllJobSeekers,
} from "../controllers/jobSeekersController.js";

import {
  jobSeekerRegisterValidator,
  jobSeekerLogInValidator,
} from "../validators/jobseekerValidator.js";

import {
  jobseekerSignUpToken,
  jobseekerLogInToken,
  verifyJobseekerToken,
  uploadPhotoMiddleware,
} from "../middleware/jobseekerAuthMiddleware.js";

router.post(
  "/registerJobSeeker",
  uploadPhotoMiddleware("").none(),
  jobSeekerRegisterValidator,
  jobseekerSignUpToken,
  registerJobSeeker
);

router.post(
  "/logInJobSeeker",
  uploadPhotoMiddleware("").none(),
  jobSeekerLogInValidator,
  jobseekerLogInToken,
  jobSeekerLogin
);

router.get("/getInfo", verifyJobseekerToken, getJobSeeker);
router.get("/getAllInfo", verifyJobseekerToken, getJobSeekerAllInfo);
router.get("/allJobSeekers", getAllJobSeekers);

router.put(
  "/updateJobSeeker",
  uploadPhotoMiddleware("public/uploads").single("photo"),
  verifyJobseekerToken,
  updateJobSeekerInfo
);
router.delete("/deleteJobSeeker/:id", deleteJobSeeker)
export default router;