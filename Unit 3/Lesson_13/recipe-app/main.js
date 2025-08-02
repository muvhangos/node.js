const express = require("express");                                // Require Express
const app = express();                                             // Create an Express app
const homeController = require("./controllers/homeController");    // Require the homeController
const errorController = require("./controllers/errorController");  // Require the errorController
const layouts = require("express-ejs-layouts");                    // Require Express layouts

// Import the MongoClient class from the mongodb package
const MongoClient = require("mongodb").MongoClient;

// Define the connection URL for the local MongoDB server (default port 27017)
const dbURL = "mongodb://localhost:27017";

// Define the name of the database to connect to (MongoDB will create it if it doesn't exist)
const dbName = "recipe_db";

// Connect to the MongoDB server using the specified URL
MongoClient.connect(dbURL, (error, client) => {
    // If there's an error connecting to the database, throw an exception and stop the program
    if (error) throw error;

    // Get a reference to the recipe_db database
    let db = client.db(dbName);

    // Access the 'contacts' collection, find all documents, and convert them to an array
    db.collection("contacts")
        .find()
        .toArray((error, data) => {
            // If there's an error retrieving the data, throw an exception
            if (error) throw error;

            // Log the retrieved data (contacts) to the console
            console.log("Contacts found in the database:");
            console.log(data);
        });

    // Insert the new contact into the 'contacts' collection
    db.collection("contacts")
        .insert({
            name: "Ted Mercury",
            email: "Ted@queen.com"
        }, (error, db) => {
            if (error) throw error;
            console.log(db);
        });
});

// Set up Express to use EJS
app.set("view engine", "ejs");                                    // Tell express to use EJS for templates 
app.use(layouts);                                                 // Tell express to use the layouts as middleware
app.set("port", process.env.PORT || 3000);                        //Set the port

app.get("/name/:myName", homeController.respondWithName);         // Using a route parameter

app.use(express.static("public"));

// Handling missing routes and errors
app.use(errorController.logErrors);                               //using Middleware 
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// Start the server
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
