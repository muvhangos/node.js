const port = 3000,
  homeController = require("./controllers/homeController"),
  express = require("express"),
  app = express();

// Middleware to log each request's URL
app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  console.log("Query parameters:", req.query); //Check page 132
  next();
});

// Body-parsing middleware for form and JSON data
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// Handle POST request to the root route "/"
app.post("/", (req, res) => {
  console.log("Body request:", req.body);                 // logs body data
  console.log("Query request:", req.query);               // logs query string (e.g. ?name=John)
  res.send("POST Successful!");
});

// Handle POST request to "/contact" route
app.post("/contact", (req, res) => {
  res.send("Contact information submitted successfully.");
});

// Route for home page
app.get("/", (req, res) => {
    res.send("INDEX");
});

// Serve static files
app.use(express.static("public"));

app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

// Dynamic route for vegetable items
app.get("/items/:vegetable", homeController.sendReqParam);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


/* Test
In browser:
1. localhost:3000
2. localhost:3000/index.html
3. localhost:3000/items/tomato

In git bash:
-X stands for "request command" in curl — it tells curl which HTTP method to use.
By default, curl makes a GET request. So if you want to make a POST, PUT, DELETE, or any other method, you need to use -X

1.  curl -X POST http://localhost:3000/contact
2.  curl -X POST http://localhost:3000
3.  curl --data "first_name=Jon&last_name=Wexler" http://localhost:3000
4.  curl "http://localhost:3000?cart=3&pagesVisited=4&utmcode=837623"
*/