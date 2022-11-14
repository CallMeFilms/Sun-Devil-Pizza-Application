// Imports
const mongoose = require("mongoose");   // For accessing database
const Schema = mongoose.Schema;         // For creating database schema

// Create user schema
// - Username: Unique string 
// - Password: Hash string
// - Role: Number
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Export user model
const User = mongoose.model("User", userSchema);
module.exports = User;