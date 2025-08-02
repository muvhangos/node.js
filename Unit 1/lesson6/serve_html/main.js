const port = 3000;
const http = require("http");
const httpStatusCodes = require("http-status-codes");
const router = require("./router");
const fs = require("fs");

const plainTextContentType = {
    "Content-Type": "text/plain"
};

const htmlContentType = {
    "Content-Type": "text/html"
};

const customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
        if (errors) {
            console.log("Error reading the file...");
        }
        res.end(data);
    });
};

router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("INDEX");//plain text
});

router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/index.html", res);//index.html
});

router.post("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("POSTED");//plain text
});

http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);