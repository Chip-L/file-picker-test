const router = require("express").Router();
const { fieldsUpload } = require("../../config/multerConfigMemory");
const {
  uploadSingleNoMW,
  saveFields,
} = require("../../controllers/imageControllers");

// router.post("/add-image", upload.single("file"), uploadSingle);
router.post("/add-image-no-mw", uploadSingleNoMW);

router.post("/add-image-by-fields", fieldsUpload, saveFields);

// export router
module.exports = router;
