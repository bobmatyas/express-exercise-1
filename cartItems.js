// Import express module
const express = require("express");

// Add router 
const cart = express.Router();

const cartItems = require('./cartData');

const pg = require("pg");

const pool = new pg.Pool({
  user: "postgres",
  password: "M4gQ39Gj3BJg_m6KEb7ZTe7eA88JhkaX",
  host: "localhost",
  port: 5432,
  database: "postgres",
  ssl: false
});


// //return JSON array of items.
// cart.get("/cart-items", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(JSON.stringify(cartItems));
// });


cart.get("/cart-items", (req, res) => {
  pool.query("SELECT * FROM ShoppingCart;")
  .then((result) => {
    res.send(result.rows);
  })
});

// // log the body to the console.
// cart.post("/cart-items", (req, res) => {
//   //log the body to the console
//   console.log(req.body);
//   res.send("Adding an item...");
//   // cartItems.push(req.body);
//   // console.log(cartItems);
// });


// cart.post("/cart-items", (req, res) => {
//   //log the body to the console
//   console.log(req.body);
//   res.send("Adding an item...");
//   // cartItems.push(req.body);
//   // console.log(cartItems);
// });


cart.post("/cart-items", (req, res) => {
  let data = req.body;
  console.log(data);
  pool.query(
      "INSERT INTO ShoppingCart (product, price, quantity) values($1::text, $2::float, $3::smallint)", 
      [data.product, data.price, data.quantity]
  )
  .then( () => {
      res.status(201); // Created
      res.send('Successfully added an item!');
  })
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