// Listing 6.5 Page 68

// Import the http-status-codes module for status code constants
const httpStatus = require("http-status-codes"),

    // Define the content type for HTML responses
    htmlContentType = {
        "Content-Type": "text/html"
    },

    // Define a routes object to store routes mapped to GET and POST requests
    routes = {
        "GET": {
            // Route for the "/info" path using the GET method
            "/info": (req, res) => {
                res.writeHead(httpStatus.OK, {
                    "Content-Type": "text/plain"       // Setting content type for plain text response
                });
                res.end("Welcome to the Info Page!");  // Sending a welcome message as response
            }
        },
        'POST': {}                                     // Empty object for POST routes (could be populated later)
    };


// Exported function to handle incoming requests and route them accordingly
exports.handle = (req, res) => {
    try {
        // Check if the requested method and URL exist in the routes object
        if (routes[req.method][req.url]) {
            // Call the appropriate function from routes based on method and URL
            routes[req.method][req.url](req, res);
        } else {
            // If no route found, return a 404 response
            res.writeHead(httpStatus.StatusCodes.NOT_FOUND, htmlContentType);
            res.end("<h1>No such file exists</h1>");
        }
    } catch (ex) {
        // Catch and log any error that occurs during handling the request
        console.log("error: " + ex);
    }
};

// Method to define a GET route
exports.get = (url, action) => {
    // Add a new GET route to the routes object
    routes["GET"][url] = action;
};

// Method to define a POST route
exports.post = (url, action) => {
    // Add a new POST route to the routes object
    routes["POST"][url] = action;
};

