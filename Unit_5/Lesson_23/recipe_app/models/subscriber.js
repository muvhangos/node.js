const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number,
        min: [10000, "Zip code too short"],
        max: 99999
    },
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