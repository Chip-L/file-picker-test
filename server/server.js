const express = require("express");
const { errorHandler } = require("./controllers/imageControllers");

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8000;

//use express static folder
app.use(express.static("./public"));

// set up middleware (parses incoming req as JSON)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Image Upload Tutorial service now listening on ${PORT}`);
});
