"use strict";

const httpStatus = require("http-status-codes"),
    contentTypes = require("./contentTypes"),
    utils = require("./utils");

const routes = { //creating two objects
    GET: {},
    POST: {}
};

//It takes two parameters, req (request) and res (response), which are objects representing the incoming HTTP request and the outgoing HTTP response respectively.
exports.handle = (req, res) => { //access information outside this module
    try {
        routes[req.method][req.url](req, res); //It tries to find a handler function for the given HTTP method, if found it is called with the request and response objects.
    } catch (e) {//If no matching handler function is found, it catches the error and sends a generic error page ("views/error.html") as the response.
        res.writeHead(httpStatus.OK, contentTypes.html);
        utils.getFile("views/error.html", res);
    }
};

exports.get = (url, action) => {
    routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};
//action essentially defines the behavior or the logic that should be executed when a particular route is accessed. It's the function that processes the request and sends back the response.