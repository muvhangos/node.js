// Import the mongoose library, which is used to interact with MongoDB
const mongoose = require("mongoose"),

    // Define the schema for a Subscriber document with name, email, and zipCode fields
    subscriberSchema = mongoose.Schema({
        name: String,
        email: String,
        zipCode: Number
    });
    
// Export the Subscriber model created from the schema
// This allows other files to use the Subscriber model for database operations
module.exports = mongoose.model("Subscriber", subscriberSchema);