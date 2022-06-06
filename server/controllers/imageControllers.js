const multer = require("multer");
const { storage, fileFilter, limits } = require("../config/multerConfigDisk");

exports.saveFields = (req, res) => {
  console.log("**** uploadFields controller ****");
  let msg;
  const files = req.files.image ?? [];

  console.log(files.length);
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
