// Imports
const mongoose = require("mongoose");   // For accessing database
const Schema = mongoose.Schema;         // For creating database schema

// Create order schema
// - Customer Details:
//  - First and last name - Strings
//  - Card number, expiration date, CVV - Number, date, and number
//  - ASU ID - String
// Order Details:
//  - Items - Array of items
const orderSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true
    },
    cardExpiration: {
        type: Date,
        required: true
    },
    cardCVV: {
        type: Number,
        required: true
    },
    asuID: {
        type: String,
        required: true
    },
    items: {
        type: [Object],
        required: true
    },
    pickupTime: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true });

// Export order model
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;