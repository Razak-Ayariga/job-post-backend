import multer from "multer";
import path from "path";
const absolutePath = path.resolve("./");

//application cv upload
const applicationCv = (destination) => {
  const directory = path.join(absolutePath, destination);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directory);
    },
    filename: function (req, file, cb) {
      const filename = file.fieldname + '_' + Date.now() + path.extname(file.originalname);
      cb(null, filename);
    }
  });
  const upload = multer({ storage });
  return upload;
};

// application letters
const applicationLetter = (destination) => {
  const directory = path.join(absolutePath, destination);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directory);
    },
    filename: function (req, file, cb) {
      const filename = file.fieldname + '_' + Date.now() + path.extname(file.originalname);
      cb(null, filename);
    }
  });
  const upload = multer({ storage });
  return upload;
};

export { applicationCv, applicationLetter };
