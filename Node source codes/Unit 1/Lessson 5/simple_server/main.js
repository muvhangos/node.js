//Listing 5.1 to 5.7

const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer((req, res) => {

        // Define route mappings for different URLs and their corresponding HTML responses
        const routeResponseMap = {
            "/info": "<h1>Info Page</h1>",
            "/contact": "<h1>Contact Us</h1>",
            "/about": "<h1>Learn More About Us.</h1>",
            "/hello": "<h1>Say hello by emailing us here</h1>",
            "/error": "<h1>Sorry, the page you are looking for is not here.</h1>"
        };

        // Set the header for the response
        res.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/html"
        });

        // Check if the request URL matches any route in the map
        if (routeResponseMap[req.url]) {
            // If a match is found, use setTimeout to delay the response by 2 seconds
            setTimeout(() => {
                res.end(routeResponseMap[req.url]);
            }, 2000);
        } else {
            // If no match, send a default response
            res.end("<h1>Welcome!</h1>");
        }

        var body = [];   // Create an array to hold the chunks of data as they are received


        req.on("data", (bodyData) => {
            body.push(bodyData);   // Add each chunk of data to the body array

        });

        req.on("end", () => {
            body = Buffer.concat(body).toString(); // Once all data is received, combine the chunks and convert to a string
            console.log(`Request Body Contents: ${body}`); // Log the contents of the request body
        })

        // Logging incoming requests to the console
        console.log(`Method: ${JSON.stringify(req.method)}`);
        console.log(`URL: ${JSON.stringify(req.url)}`);
        console.log(`Headers: ${JSON.stringify(req.headers)}`);
    });

// Start the server and listen on the specified port
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);


/*
run: Run npm i http-status-codes --save-dev 
then: npm i 
next: node main

run in browser: localhost:3000
in gitbash run: curl --data "username=Sedii&password=secret" http://localhost:3000
*/
