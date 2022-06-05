const router = require("express").Router();
const { fieldsUpload } = require("../../config/multerConfigMemory");
const {
  log,
  uploadSingleNoMW,
  saveFields,
} = require("../../controllers/imageControllers");

// router.post("/add-image", upload.single("file"), uploadSingle);
router.post("/add-image-no-mw", log, uploadSingleNoMW);

router.post("/add-image-by-fields", log, fieldsUpload, saveFields);

// export router
module.exports = router;
