const express = require("express");                                // Require Express
const app = express();                                             // Create an Express app
const homeController = require("./controllers/homeController");    // Require the homeController
const errorController = require("./controllers/errorController");  // Require the errorController
const layouts = require("express-ejs-layouts")                     // Require Express layouts

app.set("view engine", "ejs");                                    // Tell express to use EJS for templates 
app.use(layouts);                                                 // Tell express to use the layouts as middleware
app.set("port", process.env.PORT || 3000);                       //Set the port

app.get("/name/:myName", homeController.respondWithName);        // Using a route parameter

app.use(express.static("public"));

//Halding missing routes and errors
app.use(errorController.logErrors);                              // using Middleware 
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

//Start server
app.listen(app.get("port"), () => {
    console.log(`Sever running at http://localhost:${app.get("port")}`);
});