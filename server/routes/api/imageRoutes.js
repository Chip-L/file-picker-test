const router = require("express").Router();
const { log, uploadSingleNoMW } = require("../../controllers/imageControllers");

// router.post("/add-image", upload.single("file"), uploadSingle);
router.post("/add-image-no-mw", log, uploadSingleNoMW);

// export router
module.exports = router;
