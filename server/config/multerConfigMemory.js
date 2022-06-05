const multer = require("multer");

// Storage is either memory or disk
const storage = multer.memoryStorage();

// This is the function to upload folders, it could be used as middleware if exported
const upload = multer({ storage });

// middleware to upload the images. Add any other keys to the array that will need to be uploaded
exports.fieldsUpload = upload.fields([{ name: "image", maxCount: 1 }]);
