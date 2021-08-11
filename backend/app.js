var express = require("express");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

var FetchController = require("./controllers/FetchController");
var FetchResource = require("./resources/FetchResource");

// MongoDB setup
mongoose.connect(`mongodb://${process.env.DB_URI}:27017/fetchdb`, {
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", () => {
  console.log("mongoose is connected");
});

// App setup
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Controllers
const fetchController = new FetchController();

// Resources
const fetchResource = new FetchResource(fetchController);

// Setup Routes
app.use("/api", fetchResource.router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
