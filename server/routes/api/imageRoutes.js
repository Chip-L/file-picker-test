const router = require("express").Router();
const { upload } = require("../../config/multerConfig");
const {
  uploadSingle,
  uploadSingleNoMW,
  uploadMultiNoMW,
} = require("../../controllers/imageControllers");

// router.post("/add-image", upload.single("file"), uploadSingle);
router.post("/add-image-no-mw", uploadSingleNoMW);

router.post("/add-multiple-no-mw", uploadMultiNoMW);

// export router
module.exports = router;
