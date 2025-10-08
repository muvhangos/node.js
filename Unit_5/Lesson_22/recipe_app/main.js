"use strict";

// ---------------------------
// Imports
// ---------------------------
const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const Subscriber = require("./models/subscriber");
const methodOverride = require("method-override");

mongoose.Promise = global.Promise;

// ---------------------------
// Database Connection
// ---------------------------
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

// ---------------------------
//App Configuration
// ---------------------------
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// ---------------------------
// Middleware
// ---------------------------
router.use(express.static("public"));
router.use(layouts);
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));
router.use(homeController.logRequestPaths);


// Configure your Express.js application to use cookie-parser as middleware.
router.use(cookieParser("secret_passcode"));

// Configure expresssession to use cookie-parser.
router.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));

//Configure your application to use connect-flash as middleware.
router.use(connectFlash());

// Assign flash messages to the local flashMessages variable on the response object.
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// ---------------------------
//Home Routes
// ---------------------------
router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

// ---------------------------
//User Routes
// ---------------------------
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

// ---------------------------
//Subscriber Routes
// ---------------------------
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create",subscribersController.create,subscribersController.redirectView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update",subscribersController.update,subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.delete("/subscribers/:id/delete",subscribersController.delete,subscribersController.redirectView);

// ---------------------------
//Course Route
// ---------------------------
router.get("/courses", homeController.showCourses);

// ---------------------------
//Error Handling
// ---------------------------
app.use("/", router);
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

// ---------------------------
//Server Start
// ---------------------------
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
