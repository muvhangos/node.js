const mongoose = require('mongoose');

//schema creation
const subscriberSchema = mongoose.Schema({
    //Require the name property
    name: {
        type: String,
        required: true
    },
    //Require the email property, and add the lowercase property.
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    //Set up the zipCode property with a custom error message.
    zipCode: {
        type: Number,
        min: [10000, "Zip code too short"],
        max: 99999
    },
    // Add the courses array to store ObjectId references to Course documents
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

//Add an instance method to get the full name of a subscriber.
subscriberSchema.methods.getInfo = function () {
    return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

//Add an instance method to find subscribers with the same ZIP code.
subscriberSchema.methods.findLocalSubscribers = function () {
    return this.model("Subscriber")
        .find({ zipCode: this.zipCode })
        .exec();                                             //Access the Subscriber model to use the find method
};

module.exports = mongoose.model("Subscriber", subscriberSchema);