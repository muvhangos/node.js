exports.respondWithName = (req, res) => {                   //exporting a function
    // let paramsName = req.params.myName;                  // Extract the 'myName' parameter from the URL
    // res.render("index", { name: paramsName });           // Render the 'index' view and pass the extracted name to it
    res.render("index", {firstName: req.params.myName});    // You can render in one line we use firstName as a key in the object
};