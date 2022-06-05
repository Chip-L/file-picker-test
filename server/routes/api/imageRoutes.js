const router = require("express").Router();
const { upload } = require("../../config/multerConfig");
const {
  log,
  uploadSingleNoMW,
  uploadMultiNoMW,
} = require("../../controllers/imageControllers");

// router.post("/add-image", upload.single("file"), uploadSingle);
router.post("/add-image-no-mw", log, uploadSingleNoMW);

router.post("/add-multiple-no-mw", log, uploadMultiNoMW);

// export router
module.exports = router;
