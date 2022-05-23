// See instructions at: https://www.npmjs.com/package/multer
const multer = require("multer");

const MAX_FILE_SIZE = 1 * 1024 * 1024; // for 1MB

exports.storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads/"),
  filename: (req, file, cb) => {
    // create the file name:
    // 1. split the file.originalname into components with a dot (so we can capture the extension)
    // 2. capture the extension (and simultaneously remove it)
    // 3. redo the filename portion removing any spaces and replacing them with hyphens
    const origFullName = file.originalname.split(".");
    const ext = origFullName.pop();
    const fileName = origFullName.join(".").split(" ").join("-");

    // create and save the filename
    cb(null, `${fileName}-${Date.now()}.${ext}`);
  },
});

// create the filter for the files. Throw an appropriate multer error so we can catch it later.
exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

// set the size limit
exports.limits = { fileSize: MAX_FILE_SIZE };

// this is actually not used, this is needed if multer is used as a middleware
// exports.upload = multer({
//   storage: this.storage,
//   fileFilter: this.fileFilter,
//   limits: this.limits,
// });
