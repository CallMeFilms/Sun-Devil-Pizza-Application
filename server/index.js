// Imports
const dotenv = require("dotenv");  // For accessing process environment
const path = require("path");   // For ensuring correct paths are used per OS
const mongoose = require("mongoose");   // For accessing the app database
const User = require("./models/user.js");   // User model
const Order = require("./models/order.js");   // Order model
const express = require("express"); // Used to serve website content to user over HTTP
const session = require("express-session"); // For tracking user session data
const { body, validationResult } = require("express-validator");    // For validating user input
const bodyParser = require("body-parser");  // For parsing request bodies
const bcrypt = require("bcrypt");   // For hasing passwords
const nodemailer = require("nodemailer");   // For sending emails to customers
const cors = require('cors');

// Configure dotenv
dotenv.config();

// Set hashing salt rounds
const saltRounds = 10;

// Create transporter for sending emails via nodemailer
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Connect to database
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
    console.log("Connected to database...");
    // Begin listening on 3000
    app.listen(3001, () => {
        console.log("Listening on port 3001...");
    });
}).catch(console.error);

// Create web app
const app = express();
app.use(cors({
    origin: '*'
}));
// Add middleware for tracking session data and prasing request bodies
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json({ extended: true }));

// GET Requests

// "/getCart" - Endpoint for retrieving cart items for checkout page
app.get("/getCart", (req, res) => {
    if(!req.session.cart || !req.session.cart.length) {
        res.send({
            subtotal: "0.00",
            tax: "0.00",
            total: "0.00",
            items:[]
        });
        return;
    }
    var subtotal = req.session.cart.length * 10.99;
    var tax = Math.ceil(subtotal * 0.1 * 100) / 100;
    var total = Math.ceil(subtotal * 1.1 * 100) / 100;
    res.send({
        subtotal: subtotal,
        tax: tax,
        total: total,
        items: req.session.cart
    });
});

// "/readyToCook" - Endpoint for retrieving ready-to-cook orders for the chef page
app.get("/readyToCook", (req, res) => {
    Order.find({ status:1 }).then(result => {
        var orders = [];
        for(var i = 0; i < result.length; i++) {
            orders.push({
                orderNum: result[i].orderNumber,
                firstName: result[i].firstName,
                lastName: result[i].lastName,
                items: result[i].items,
                pickupTime: result[i].pickupTime,
                status: result[i].status
            });
        }
        res.send(orders);
    }).catch(console.error);
});

// "/cooking" - Endpoint for retrieving orders currently cooking for the chef page
app.get("/cooking", (req, res) => {
    Order.find({ status: 2 }).then(result => {
        var orders = [];
        for(var i = 0; i < result.length; i++) {
            orders.push({
                orderNum: result[i].orderNumber,
                firstName: result[i].firstName,
                lastName: result[i].lastName,
                items: result[i].items,
                pickupTime: result[i].pickupTime,
                status: result[i].status
            });
        }
        res.send(orders);
    }).catch(console.error);
});

// "/accepted" - Endpoint for retrieving accepted orders for the OP page
app.get("/accepted", (req, res) => {
    Order.find({ status: 0 }).then(result => {
        var orders = [];
        for(var i = 0; i < result.length; i++) {
            orders.push({
                orderNum: result[i].orderNumber,
                firstName: result[i].firstName,
                lastName: result[i].lastName,
                items: result[i].items,
                pickupTime: result[i].pickupTime,
                status: result[i].status
            });
        }
        res.send(orders);
    }).catch(console.error);
});

// "/finished" - Endpoint for retrieving finished orders for the OP page
app.get("/finished", (req, res) => {
    Order.find({ status: 3 }).then(result => {
        var orders = [];
        for(var i = 0; i < result.length; i++) {
            orders.push({
                orderNum: result[i].orderNumber,
                firstName: result[i].firstName,
                lastName: result[i].lastName,
                items: result[i].items,
                pickupTime: result[i].pickupTime,
                status: result[i].status
            });
        }
        res.send(orders);
    }).catch(console.error);
});

// POST Requests

// "/addToCart" - Endpoint for adding item to cart
app.post("/addToCart", body("type").custom(validType), body("toppings").custom(validToppings), (req, res) => {
//app.post("/addToCart",(req, res) => {
    var errors = validationResult(req).errors;
    // If any errors are found, alert user appropriately
    if(errors.length > 0) {
        console.log(errors);
        res.sendStatus(400);
        return;
    }
    // Otherwise, continue handling request
    var newItem = req.body;
    // If no toppings were selected, add empty array for toppings to item
    if(!newItem.toppings) newItem.toppings = [];
    // Add item to session cart
    if(!req.session.cart) req.session.cart = [newItem];
    else req.session.cart.push(newItem);

    res.sendStatus(200);
});

// "/register" - Endpoint for registering new employee account
app.post("/register", (req, res) => {
    if(req.body.admin !== "passwordlol") {
        res.sendStatus(403);
        return;
    }
    if(!req.body.username || !req.body.password) {
        res.sendStatus(400);
        return;
    }
    bcrypt.genSalt(saltRounds, (error, salt) => {
        if(error) {
            console.error(error);
            return;
        }
        bcrypt.hash(req.body.password, salt, (error, hash) => {
            if(error) {
                console.error(error);
                return;
            }
            const newUser = new User({
                username: req.body.username,
                password: hash,
                role: req.body.role
            });
            newUser.save().then(result => {
                res.sendStatus(200);
            }).catch(console.error);
        });
    });
});

// "/login" - Endpoint for employee login
app.post("/login", (req, res) => {
    var credentials = req.body;
    User.findOne({ username:credentials.username }).then(result => {
        // If account can not be found, send error message
        if(!result) {
            res.sendStatus(403);
            return;
        }
        bcrypt.compare(req.body.password, result.password, (error, matches) => {
            // If password doesn't match, send error message
            if(!matches) {
                res.sendStatus(403);
                return;
            }
            // Depending on role, send user to appropriate page
            switch(result.role) {
                case 0:
                    req.session.permissions = 0;
                    res.send("OP");
                    break;
                case 1:
                    req.session.permissions = 1;
                    res.send("Chef");
                    break;
                default:
                    req.session.permissions = 0;
                    res.send("OP");
                    break;
            }
            // res.sendStatus(200);
        });
    }).catch(console.error);
});

var lastestOrderNumber = 1;
// "/checkout" - Endpoint for checking out
app.post("/checkout", (req, res) => {
    // If cart is empty, send Bad Request error
    if(!req.session.cart || req.session.cart.length === 0) {
        res.sendStatus(400);
        return;
    }
    req.body.items = req.session.cart;
    // Find highest order number and use next highest number as new order's order number
    var highestOrderSearch = Order.find({}).sort({ orderNumber: -1 }).limit(1);
    highestOrderSearch.exec().then(highestOrder => {
        var newOrderNumber = 1;
        if(highestOrder.length > 0){
            newOrderNumber = highestOrder[0].orderNumber + 1;
        }
        // Create a new order given checkout details
        const newOrder = new Order({
            orderNumber: newOrderNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            cardNumber: req.body.cardNumber,
            cardExpiration: req.body.expirationMonth + "/" + req.body.expirationYear,
            cardCVV: req.body.cardCVV,
            asuID: req.body.asuID,
            items: req.session.cart,
            pickupTime: new Date() + 3600,
            status: 0
        });
        // Save order in database
        newOrder.save().then(result => {
            // Clear cart
            req.session.cart = [];
            // Send OK to client
            res.sendStatus(200);
        }).catch(console.error);
    }).catch(console.error);
});

// "/incrementStatus" - Endpoint for incrementing status of a given order
app.post("/incrementStatus", (req, res) => {
    Order.findOne({ orderNumber: req.body.orderNumber }).then(result => {
        // If order is archived, send Bad Request error
        if(result.status > 3) {
            res.sendStatus(400);
            return;
        }
        Order.updateOne({ orderNumber:req.body.orderNumber }, { $inc: { status: 1 } }).then(result2 => {
            // If order status is now 4, send email to customer letting them know their order is ready
            if(result.status === 3) {
                var orderDetails = "";
                var cost = 0;
                for(var i = 0; i < result.items.length; i++) {
                    var curItem = result.items[i];
                    var toppings = "";
                    var toppingsCost = 0;
                    for(var j = 0; j < curItem.toppings.length; j++) {
                        var curTopping = curItem.toppings[j];
                        toppings += (j === 0 ? "" : ", ") + (j === curItem.toppings.length - 1 ? "and " : "") + curTopping.toLowerCase();
                        toppingsCost++;
                    }
                    orderDetails += "1 " + result.items[i].type + " pizza" + (toppings.length ? " with " + toppings : "") + " - $" + (11 + toppingsCost) + "\n";
                    cost += 11 + toppingsCost;
                }
                var mailOptions = {
                    from: "lucaseastman02@gmail.com",
                    to: result.email,
                    subject: "Order Ready",
                    text: "Hello " + result.firstName + ",\n\nYour Sun Devil Pizza order is ready for pickup.\n\nOrder Receipt:\n" + orderDetails + "Subtotal: $" + cost + "\nTax: $" + (Math.round(cost * 0.1 * 100) / 100) + "\nTotal: $" + (Math.round(cost * 1.1 * 100) / 100)
                }
                transporter.sendMail(mailOptions, (error, info) => {
                    if(error) {
                        console.error(error);
                        return;
                    }
                });
            }
            res.sendStatus(200);
        }).catch(console.error);
    }).catch(console.error);
});

// All other requests
app.get("*", (req, res) => {
    res.sendStatus(404);
});

// Custom form validation functions

// Validate pizza type
function validType(value) {
    // If pizza type does not match any of allowed types, return false
    if(!["Pepperoni", "Vegetable", "Cheese"].includes(value)) {
        return false;
    }
    return true;
}

// Validate pizza toppings
function validToppings(values) {
    // If no toppings, return true
    if(!values) return true;
    // If any toppings don't match toppings allowed, return false
    for(var i = 0; i < values.length; i++) {
        if(!["Mushrooms", "Onions", "Olives", "Extra Cheese"].includes(values[i])) return false;
    }
    // Otherwise, return true
    return true;
}
