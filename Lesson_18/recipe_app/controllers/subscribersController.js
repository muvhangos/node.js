const Subscriber = require('../models/subscriber');             // Require subscriber

// Controller action to retrieve all subscribers from the database and render them in the "subscribers" view
exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
    .exec()
        .then((subscribers) => {

             // Render the "subscribers" view and pass the retrieved subscribers
            res.render("subscribers", {
                subscribers: subscribers
            });
        })
        .catch((error) => {
            // Log any error that occurs during the query execution
            console.log(error.message);
            return [];
        })
        .then(() => {
             // Log a message after the promise completes
            console.log("Promise Complete")
        });
};

// Controller action to render the subscription (contact) page
exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

// Controller action to handle form submission and save a new subscriber to the database
exports.saveSubscriber = (req, res) => {
    // Create a new subscriber instance using data from the request body
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    // Save the new subscriber to the database with a promise return (.then)
    newSubscriber.save()
    .then((result) => {
        res.render("thanks"); 
    })

    // If an error occurs while saving, send the error in the response
    .catch((error) => {
        res.send(error);
    });
};