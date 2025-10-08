"use strict";
// Imports
const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscriberController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const Subscriber = require("./models/subscriber");

mongoose.Promise = global.Promise;

// Database Connection
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

//App Configuration
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");


// Middleware
router.use(express.static("public"));
router.use(layouts);
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(homeController.logRequestPaths);

//Home Routes
router.get("/", homeController.index);
router.get("/contact", subscriberController.getSubscriptionPage);

//User Routes
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);


//Subscriber Routes
router.get("/subscribers", subscriberController.getAllSubscribers, (req, res, next) => {
  res.render("subscribers", { subscribers: req.data });
});

router.post("/subscribe", subscriberController.saveSubscriber);

//Course Route
router.get("/courses", homeController.showCourses);

//Error Handling
app.use("/", router);
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);


//Server Start
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
