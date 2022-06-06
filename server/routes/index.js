const router = require("express").Router();
const multer = require("multer");
const upload = multer();

// import route files
const apiRoutes = require("./api");

// setup routes
router.use("/api", apiRoutes);
router.post("/post", upload.none(), (req, res, next) => {
  console.log(req.body);
  try {
    const { date, time } = req.body;

    if (!date || !time) {
      throw Error("missing fields date and/or time");
    }

    res.statusCode = 200;
    res.json({
      success: `post test done on ${date} at ${time}`,
    });
  } catch (err) {
    return next(err);
  }
});
router.get("/", (req, res) => {
  console.log("network test request");
  res.json({ success: "success" });
});
// export router
module.exports = router;
