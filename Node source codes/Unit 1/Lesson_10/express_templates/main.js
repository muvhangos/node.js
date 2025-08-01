const express = require("express");                              // Require Express
const app = express();                                           // Create an Express app
const homeController = require("./controllers/homeController");  // Require the homeController
const layouts = require("express-ejs-layouts")                   // Require Express layouts

app.set("view engine", "ejs");                                    // Tell express to use EJS for templates 
app.use(layouts);                                                 // Tell express to use the layouts as middleware
app.set("port", process.env.PORT || 3000);                       //Set the port

app.get("/name/:myName", homeController.respondWithName);        // Using a route parameter

//Start server
app.listen(app.get("port"), () => {
    console.log(`Sever running at http://localhost:${app.get("port")}`);
});


// test the two in indexedDB.ejs
// This is fixed. No matter who visits the page, it will always say "Hello, Lee".

// <% let name="Lee" ; %>
//     <h1> 
//         Hello, <%= name %>
//     </h1> 


// Allows you to dynamically change the value based on user input or data passed from your server. 
// <h1>Hello, <%= firstName %>!</h1>