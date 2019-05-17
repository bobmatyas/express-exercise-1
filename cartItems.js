// Import express module
const express = require("express");

// Add router 
const cart = express.Router();

const cartItems = require('./cartData');


//return JSON array of items.
cart.get("/cart-items", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(cartItems));
});


// log the body to the console.
cart.post("/cart-items", (req, res) => {
  //log the body to the console
  console.log(req.body);
  res.send("Adding an item...");
  // cartItems.push(req.body);
  // console.log(cartItems);
});

// log the _ID_ URL param and the body to the console.
cart.put("/cart-items/:id", (req, res) => {
  console.log(`Updating item: ${req.params.id}`);
  console.log(req.body);
  res.send("Updating an item...");
});

// log the _ID_ URL param to the console.
cart.delete("/cart-items/:id", (req, res) => {
  console.log(`Deleting item: ${req.params.id}`);
  res.send("Deleting an item...");
});

// can export one thing as object
module.exports = cart;