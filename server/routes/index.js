const router = require("express").Router();

// import route files
const apiRoutes = require("./api");

// setup routes
router.use("/api", apiRoutes);
router.post("/post", (req, res, next) => {
  console.log(req.body);
  try {
    res.statusCode = 200;
    res.json({
      data: `post test done on ${req.body.date} at ${req.body.time}`,
    });
  } catch (err) {
    return next(err);
  }
});
router.get("/", (req, res) => {
  console.log("network test request");
  res.send({ success: "success" });
});
// export router
module.exports = router;
