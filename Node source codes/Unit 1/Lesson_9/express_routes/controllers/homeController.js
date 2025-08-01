//This code defines and exports a function called sendReqParam that handles an HTTP request. 
// It retrieves a parameter named vegetable from the URL (e.g., from a route like /veggie/:vegetable) 
// and sends back a response displaying a message like "This is the page for [vegetable]".

exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
};