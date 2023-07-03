import multer from "multer";
import path from "path";
const absolutePath = path.resolve("./");

//middleware to upload photo
const photoUpload = (destination) => {
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
    const { mimetype } = file;
    if (mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(new Error("Upload only images!"));
    }
    return;
  };

  const upload = multer({ storage, fileFilter });
  return upload;
};

export default photoUpload;
