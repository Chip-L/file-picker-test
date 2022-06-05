const multer = require("multer");

exports.errorHandler = (err, req, res, next) => {
  console.log("**** errorHandler controller ****");
  if (err) {
    // console.log("err:", err);
    errObj = validateError(err, req.path);
    console.log("error:", errObj);
    res.status(errObj.code);
    res.json(errObj);
    return;
  }
};

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
          msg: "Too many files!",
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
  return resJson;
};
