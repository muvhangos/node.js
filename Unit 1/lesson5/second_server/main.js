const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");

const app = http.createServer();

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

app.on("request", (req, res) => {
    let body = [];
    req.on("data", (bodyData) => {
        body.push(bodyData);
    });
    req.on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(`Request Body Contents: ${body}`);
    });
    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Headers: ${getJSONString(req.headers)}`);

    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    let responseMessage = "<h1>This will show on the screen.</h1>";
    res.end(responseMessage);
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);