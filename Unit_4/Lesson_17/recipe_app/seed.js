"use strict"; // Enforces strict mode to catch common JavaScript mistakes and unsafe actions

const mongoose = require("mongoose");                // Import Mongoose library for MongoDB interaction
const Subscriber = require("./models/subscriber");   // Import the Subscriber model from the local file

// Connect to the MongoDB database located at localhost on port 27017, using the database named 'recipe_db'
mongoose.connect(
  "mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true, useUnifiedTopology: true } // Use new URL parser to avoid deprecation warnings
);

// Reference to the default Mongoose connection (optional, here just accessing it)
mongoose.connection;

// Sample subscriber data to seed into the database
let contacts = [
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com",
    zipCode: 10016
  },
  {
    name: "Chef Eggplant",
    email: "eggplant@recipeapp.com",
    zipCode: 20331
  },
  {
    name: "Professor Souffle",
    email: "souffle@recipeapp.com",
    zipCode: 19103
  }
];

// Clear all existing subscriber documents in the database before inserting new data
Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!"); // Log message when the deletion is successful
  });

// Array to hold all the database insert (create) operations
let commands = [];

// Iterate over each contact and create a new Subscriber document (excluding zipCode for simplicity)
contacts.forEach(c => {
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email
    })
  );
});

// Wait for all create operations to complete
Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r)); // Output the created subscriber records
    mongoose.connection.close();    // Close the database connection once done
  })
  .catch(error => {
    console.log(`ERROR: ${error}`); // Catch and log any error that occurs during the insert process
  });
