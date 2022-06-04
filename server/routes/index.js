const router = require("express").Router();

// import route files
const apiRoutes = require("./api");

// setup routes
router.use("/api", apiRoutes);
router.get("/", (req, res) => {
  res.send({ success: "success" });
});
// export router
module.exports = router;
