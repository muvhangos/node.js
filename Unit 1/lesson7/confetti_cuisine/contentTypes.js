"use strict";

module.exports = {
    html: {
        "Content-Type": "text/html"
    },
    text: {
        "Content-Type": "text/plain"
    },
    js: {
        "Content-Type": "text/js"
    },
    jpg: {
        "Content-Type": "image/jpg"
    },
    png: {
        "Content-Type": "image/png"
    },
    css: {
        "Content-Type": "text/css"
    }
};

//module.exports: This statement exports the object as the module's public interface. This allows other modules to import and use it.
//The value is a string representing the MIME type associated with the corresponding file extension.
//The ContentType property sets the HTTP content type for the response object.