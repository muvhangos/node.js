const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");

const app = http.createServer((request, response) => {
    console.log("Received an incoming request!");
    response.writeHead(httpStatus.OK, {
        "Content-Type": "text/html" //status 200 = everything works
    });

    let responseMessage = "<h1>Hello, Universe!</h1>";
    response.write(responseMessage);
    response.end();
    console.log(`Sent a response : ${responseMessage}`);
});

app.listen(port);

console.log(`The server has started and is listening on port number: ${port}`);