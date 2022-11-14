// Imports
const path = require("path");   // For ensuring correct paths are used per OS
const mongoose = require("mongoose");   // For accessing the app database
const User = require("./models/user.js");   // User model
const Order = require("./models/order.js");   // Order model
const express = require("express"); // Used to serve website content to user over HTTP
const session = require("express-session"); // For tracking user session data
const { body, validationResult } = require("express-validator");    // For validating user input
const bodyParser = require("body-parser");  // For parsing request bodies
const bcrypt = require("bcrypt");   // For hasing passwords

// Set hashing salt rounds
const saltRounds = 10;

// Connect to database
// TO-DO: Implement process environment for security
const dbURI = "mongodb+srv://sdp:LKCool711@cluster0.mvik8.mongodb.net/sdp?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
    console.log("Connected to database...");
    // Begin listening on 3000
    app.listen(3000, () => {
        console.log("Listening on port 3000...");
    });
}).catch(console.error);

// Create web app
const app = express();

// Add middleware for tracking session data and prasing request bodies
app.use(session({
    // TO-DO: Implement use of .env secret
    secret: "tttemporaryyy secrrret",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));

// GET Requests

// "/cart" - View cart
app.get("/cart", (req, res) => {
    res.render("cart", { cart: req.session.cart });
    // TO-DO: Display cart to user
});

// "/checkout" - Checkout form
app.get("/checkout", (req, res) => {
    // If cart is empty, send cart page to user
    if(!req.session.cart) res.redirect("/cart");
    // Get session cart
    const cart = req.session.cart;
    // Calculate cart cost
    var cartCost = 0;
    for(var i = 0; i < cart.length; i++) {
        cartCost += 11;
        if(Array.isArray(cart[i].toppings)) cartCost += cart[i].toppings.length;
    }
    // Calculate tax
    var tax = Math.ceil(cartCost * 0.1 * 100) / 100;
    res.render("checkout", { cartCost: cartCost, tax: tax });
    // TO-DO: Send checkout form to user
});

// POST Requests

// "/addToCart" - Endpoint for adding item to cart
app.post("/addToCart", body("type").custom(validType), body("toppings").custom(validToppings), (req, res) => {
    var errors = validationResult(req).errors;
    // If any errors are found, alert user appropriately
    if(errors.length > 0) {
        console.log(errors);
        res.sendStatus(400);
        // TO-DO: Send order form to user with appropriate error messages
        return;
    }
    // Otherwise, continue handling request
    var newItem = req.body;
    // If no toppings were selected, add empty array for toppings to item
    if(!newItem.toppings) newItem.toppings = [];
    // Add item to session cart
    if(!req.session.cart) req.session.cart = [newItem];
    else req.session.cart.push(newItem);

    // res.sendStatus(200);
    res.redirect("/cart");
    // TO-DO: Redirect user to "/cart"
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
            // TO-DO Send login page to user with error message
            res.sendStatus(403);
            return;
        }
        bcrypt.compare(req.body.password, result.password, (error, matches) => {
            // If password doesn't match, send error message
            if(!matches) {
                res.sendStatus(403);
                // TO-DO Send login page to user with error message
                return;
            }
            // Depending on role, send user to appropriate page
            switch(result.role) {
                case 0:
                    req.session.permissions = 0;
                    res.send("OP");
                    // TO-DO Send user to order processor page
                    break;
                case 1:
                    req.session.permissions = 1;
                    res.send("Chef");
                    // TO-DO Send user to chef page
                    break;
                default:
                    req.session.permissions = 0;
                    res.send("OP");
                    // TO-DO Send user to order processor page
                    break;
            }
            // res.sendStatus(200);
        });
    }).catch(console.error);
});

// "/checkout" - Endpoint for checking out
app.post("/checkout", (req, res) => {
    console.log(req.body);
    req.body.items = req.session.cart;
    const newOrder = new Order({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cardNumber: req.body.cardNumber,
        cardExpiration: new Date(req.body.expirationYear, req.body.expirationMonth - 1),
        cardCVV: req.body.cardCVV,
        asuID: req.body.asuID,
        items: req.body.items,
        pickupTime: new Date() + 3600
    });
    newOrder.save().then(result => {
        res.redirect("/thankyou");
    }).catch(console.error);
});

// All other requests
app.get("*", (req, res) => {
    res.sendStatus(404);
    // TO-DO: Send 404 error page to user
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
        if(!["Mushroom", "Onions", "Olives", "Extra Cheese"].includes(values[i])) {
            console.log(values[i]);
            return false;
        }
    }
    // Otherwise, return true
    return true;
}