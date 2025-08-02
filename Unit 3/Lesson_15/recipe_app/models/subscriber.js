const mongoose = require('mongoose');

//schema creation
const subscriberSchema = mongoose.Schema({
    //schema properties
    name: String,
    email: String,
    zipCode: Number
});

module.exports = mongoose.model("Subscriber", subscriberSchema);