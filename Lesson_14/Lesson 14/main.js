const express = require("express");                                // Require Express
const app = express();                                             // Create an Express app
const homeController = require("./controllers/homeController");    // Require the homeController
const errorController = require("./controllers/errorController");  // Require the errorController
const layouts = require("express-ejs-layouts");                    // Require Express layouts

// Import the mongoose library, which is used to interact with MongoDB
const mongoose = require("mongoose");

// Import the Subscriber model from the models folder
const Subscriber = require("./models/subscriber");

// Connect to the local MongoDB "recipe_db" using Mongoose
mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Store the connection object in a variable for further use
const db = mongoose.connection;

// Once the connection to the database is successfully opened,
// execute the callback function to log a success message
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// // Example to create a new subscriber using the save method
// const subscriber1 = new Subscriber({
//     name: "Jon Wexler",
//     email: "jon@jonwexler.com",
// });

// subscriber1.save((error, savedDocument) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Saved subscriber using save method:", savedDocument);
//     }
// });

// // Example to create a new subscriber using the create method
// Subscriber.create({
//     name: "Jack Wexler",
//     email: "jack@jonwexler.com",
// }, (error, savedDocument) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Saved subscriber using create method:", savedDocument);
//     }
// });

// Example query to find "Jon Wexler" with "wexler" in the email and log the name
var myQuery = Subscriber.findOne({ name: "Jon Wexler" })
    .where("email", /wexler/);

myQuery.exec((error, data) => {
    if (data) console.log("Found via query:", data.name);
    if (error) console.log("Query error:", error);
});

// Set up Express to use EJS
app.set("view engine", "ejs");                                    // Tell express to use EJS for templates 
app.use(layouts);                                                 // Tell express to use the layouts as middleware
app.set("port", process.env.PORT || 3000);                        // Set the port

app.get("/name/:myName", homeController.respondWithName);         // Using a route parameter

app.use(express.static("public"));

// Handling missing routes and errors
app.use(errorController.logErrors);                               // Using Middleware 
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// Start the server
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
