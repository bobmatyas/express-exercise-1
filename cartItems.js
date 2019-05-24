// Import express module
const express = require("express");

// Add router 
const cart = express.Router();

//const cartItems = require('./cartData');

const pg = require("pg");

const pool = new pg.Pool({
  user: "postgres",
  password: "M4gQ39Gj3BJg_m6KEb7ZTe7eA88JhkaX",
  host: "localhost",
  port: 5432,
  database: "postgres",
  ssl: false
});


// DISPLAY ITEMS IN DATABASE

cart.get("/cart-items", (req, res) => {
  pool.query("SELECT * FROM ShoppingCart;")
  .then((result) => {
    res.send(result.rows);
  })
});


// ADD AN ITEM TO THE DATABASE

cart.post("/cart-items", (req, res) => {
  let data = req.body;
  pool.query(
      "INSERT INTO ShoppingCart (product, price, quantity) values($1::text, $2::float, $3::smallint)", 
      [data.product, data.price, data.quantity]
  )
  .then( () => {
      res.status(201); // Created
      res.send('Successfully added an item!');
  })
});



// UPDATE AN ITEM IN THE DATABASE

cart.put("/cart-items/:id", (req, res) => {
  console.log(`Updating item: ${req.params.id}`);
  console.log(req.body);
  let data = req.body;
  pool.query(
      "UPDATE ShoppingCart SET product=$2::text, price=$3::float, quantity=$4::smallint WHERE id=$1::int", 
      [req.params.id, data.product, data.price, data.quantity]
  )
  .then( () => {
      res.status(201); // Created
      res.send('Successfully updated an item!');
  })

});


// DELETE AN ITEM FROM THE DATABASE

cart.delete("/cart-items/:id", (req, res) => {
  console.log(`Deleting item: ${req.params.id}`);
  let data = req.body;
  pool.query(
    "DELETE FROM ShoppingCart WHERE id=$1::int", 
    [req.params.id]
  )
  .then( () => {
    res.status(201); // Created
    res.send('Successfully deleted an item!');
  })
});



// can export one thing as object
module.exports = cart;