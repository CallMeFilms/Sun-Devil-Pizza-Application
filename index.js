// Imports
const path = require("path");   // For ensuring correct paths are used per OS
const express = require("express"); // Used to serve website content to user over HTTP
const session = require("express-session"); // For tracking user session data
const { body, validationResult } = require("express-validator");    // For validating user input
const bodyParser = require("body-parser");  // For parsing request bodies

// TO-DO: Implement MongoDB

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

// Add middleware for serving static pages, CSS, JS, and images
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

// Set up views and view engine
app.set("views", "./views");
app.set("view engine", "ejs");

// GET Requests

// "/" - Home page
app.get("/", (req, res) => {
    res.sendStatus(200);
    // TO-DO: Send index to user
    // res.render("index", {});
});

// "/menu" - Order menu
app.get("/menu", (req, res) => {
    res.sendStatus(200);
    // TO-DO: Send menu to user
});

// "/cart" - View cart
app.get("/cart", (req, res) => {
    if(req.session.cart) res.send(req.session.cart);
    else res.send("Cart is empty");
    // TO-DO: Display cart to user
});

// "/checkout" - Checkout form
app.get("/checkout", (req, res) => {
    res.sendStatus(200);
    // TO-DO: Send checkout form to user
});

// POST Requests

// "/addToCart" - Endpoint for adding item to cart
app.post("/addToCart", body("type").custom(validType), body("toppings").custom(validToppings), (req, res) => {
    var errors = validationResult(req).errors;
    // If any errors are found, alert user appropriately
    if(errors.length > 0) {
        res.sendStatus(400);
        // TO-DO: Send order form to user with appropriate error messages
        return;
    }
    // Otherwise, continue handling request
    var newItem = req.body;
    // Add item to session cart
    if(!req.session.cart) req.session.cart = [newItem];
    else req.session.cart.push(newItem);

    res.sendStatus(200);
    // TO-DO: Redirect user to "/cart"
});

// All other requests
app.get("*", (req, res) => {
    res.sendStatus(404);
    // TO-DO: Send 404 error page to user
});

// Begin listening on 3000
app.listen(3000, () => {
    console.log("Listening on port 3000...");
});

// Custom form validation functions

// Validate pizza type
function validType(value) {
    if(!["Pepperoni", "Vegetable", "Cheese"].includes(value)) {
        return false;
    }
    return true;
}

// Validate pizza toppings
function validToppings(values) {
    if(values.length === 0) return false;
    return true;
}