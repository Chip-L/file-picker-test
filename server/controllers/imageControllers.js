const multer = require("multer");
const { storage, fileFilter, limits } = require("../config/multerConfigDisk");

exports.saveFields = (req, res, next) => {
  console.log("**** uploadFields controller ****");
  let msg;
  const files = req.files.image ?? [];

  console.log(req.body);
  const hasError = Boolean(req.body.hasError) || false;
  const errNumber = parseInt(req.body.errorNumber) || 200;

  console.log(JSON.stringify({ hasError, errNumber }, null, 2));
  if (hasError) {
    err = new Error(req.body.errorMessage);

    res.status(errNumber);
    res.json(err.message);
    return;
    //  next(err);
  }

  console.log("files.length:", files.length);
  console.log("req.body.action:", req.body.action);

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      console.log(`req.files.image[${i}]:\n`, files[i]);
    }
    msg = "uploadFields done";
  } else {
    msg = "no file submitted";
  }

  msg += "\nBut action was '" + req.body.action + "'";
  res.json({ msg, code: 200 });
  console.log("response sent:", JSON.stringify({ msg, code: 200 }));
};

exports.uploadSingleNoMW = (req, res, next) => {
  console.log("**** uploadSingleNoMW controller ****");

  // configure multer
  const upload = multer({ storage, fileFilter, limits }).single("image");

  // This defines the req.file
  upload(req, res, function (err) {
    console.log("passed multer");
    if (err) {
      console.log("multer error");
      return next(err);
    }

    // Everything went fine.
    console.log("body:", req.body);
    console.log("file:", req.file);
    console.log("uploadSingleNoMW: everything is ok");
    res.json({ msg: "Your image has been updated!", code: 200 });
  });
};
