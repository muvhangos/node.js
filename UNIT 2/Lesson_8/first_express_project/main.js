const port = 3000,               //Define the port number 
    express = require("express"),  // Import the Express library to create a server
    app = express();               // Create an instance of an Express application

// Define a route handler for HTTP GET requests to the root URL ("/")
app.get("/", (req, res) => {
    console.log("Route parameters:", req.params);
    console.log("Request body:", req.body);
    console.log("Request URL:", req.url);
    console.log("Query string:", req.query);

    res.send("Hello, Universe!");  // Send a response back to the client
})

    // Start the server 
    .listen(port, () => {
        console.log(`The Express.js server has started and is listening on port number: ${port}`);
    });
