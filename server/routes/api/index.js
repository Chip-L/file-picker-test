const router = require("express").Router();

// import route files
const imageRoutes = require("./imageRoutes");

// setup routes
router.use("/", imageRoutes);

// export router
module.exports = router;
