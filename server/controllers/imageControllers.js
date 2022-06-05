const multer = require("multer");
const { storage, fileFilter, limits } = require("../config/multerConfig");

// MulterError body:
// code: "LIMIT_FILE_SIZE";
// field: "file";
// message: "File too large";
// name: "MulterError";
// storageErrors: [];

// https://github.com/expressjs/multer/blob/master/lib/multer-error.js
const validateError = (err, funcName = "") => {
  if (funcName) funcName += ": ";
  let resJson = {};
  if (err instanceof multer.MulterError) {
    console.log(funcName + "MulterError error:\n", err);

    switch (err.code) {
      case "LIMIT_PART_COUNT":
        resJson = {
          msg: "Too many parts",
          code: 400,
        };
        break;
      case "LIMIT_FILE_SIZE":
        resJson = {
          msg: "File too large",
          code: 413,
        };
        break;
      case "LIMIT_FILE_COUNT":
        resJson = {
          msg: "Too many files",
          code: 413,
        };
        break;
      case "LIMIT_FIELD_KEY":
        resJson = {
          msg: "Field name too long",
          code: 400,
        };
        break;
      case "LIMIT_FIELD_VALUE":
        resJson = {
          msg: "Field value too long",
          code: 400,
        };
        break;
      case "LIMIT_FIELD_COUNT":
        resJson = {
          msg: "Too many fields",
          code: 400,
        };
        break;
      case "LIMIT_UNEXPECTED_FILE":
        resJson = {
          msg: "Only .png, .jpg and .jpeg format allowed!",
          code: 400,
        };
        break;
      case "MISSING_FIELD_NAME":
        resJson = {
          msg: "Field name missing",
          code: 400,
        };
        break;
      default:
        resJson = {
          msg: "unknown error",
          code: 400,
        };
    }
  } else if (err) {
    console.log(
      funcName + "A non-MulterError error occurred when uploading:\n",
      err
    );
    resJson = {
      msg: "unknown?" + err.message,
      code: 500,
    };
  }
  console.log("validateError", resJson);
  return resJson;
};

/* 
This code does not actually work. If I take out the "err", it works fine for valid files, but it doesn't catch the error message for the invalid files. If I leave "err" in, the upload middleware never passes over to here and the code never executes for valid files. 

As per https://www.npmjs.com/package/multer#error-handling, we shouldn't be doing this with middleware and we need to include it in the function.

exports.uploadSingle = (err, req, res, next) => {
  console.log("uploadSingle reached:");
  console.log("\tfile:", req.file);
  console.log("\terr:", err);

  // check for bad type
  if (err) {
    res.json(validateError(err, "uploadSingle"));
    return;
  }

  console.log("uploadSingle: Your image has been updated!");
  res.json({ msg: "Your image has been updated!", code: 200 });
};
*/

exports.uploadSingleNoMW = (req, res, next) => {
  console.log("**** uploadSingleNoMW controller ****");
  console.log("raw req:");
  console.log(req);

  // configure multer
  const upload = multer({ storage, fileFilter, limits }).single("file");

  // This defines the req.file
  upload(req, res, function (err) {
    console.log("passed multer");
    if (err) {
      res.json(validateError(err, "uploadSingleNoMW"));
      console.log("res: ", res);
      res.end();
      return;
    }

    // Everything went fine.
    console.log("body:", req.body);
    console.log("file:", req.file);
    console.log("uploadSingleNoMW: everything is ok");
    res.json({ msg: "Your image has been updated!", code: 200 });
  });
};

// Note: if 1 file is bad, all files are rejected.
exports.uploadMultiNoMW = (req, res, next) => {
  const upload = multer({ storage, fileFilter, limits }).array("files");

  // This defines the req.file
  upload(req, res, function (err) {
    if (err) {
      res.json(validateError(err, "uploadMultiNoMW"));
      return;
    }

    // // Everything went fine.
    console.log("body:", req.body);
    console.log("files:", req.files);
    console.log("uploadMultiNoMW: everything is ok");
    res.json({ msg: "Your image has been updated!", code: 200 });
  });
};

exports.log = (req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  next();
};
