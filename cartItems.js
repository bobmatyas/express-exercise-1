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
  database: "ExpressShopDB",
  ssl: false
});


// DISPLAY ITEMS IN DATABASE

cart.get("/cart-items", (req, res) => {
  pool.query("SELECT * FROM ShoppingCart ORDER BY id;")
  .then((result) => {
    res.send(result.rows);
  })
  .catch( (err) => {
    console.log('error');
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
  .catch( (err) => {
    console.log('error');
  })
});



// UPDATE AN ITEM IN THE DATABASE

cart.put("/cart-items/:id", (req, res) => {
  let data = req.body;
  pool.query(
      "UPDATE ShoppingCart SET quantity=$2::smallint WHERE id=$1::int", 
      [req.params.id, data.quantity]
  )
  .then( () => {
      res.status(201); // Created
      res.send('Successfully updated an item!');
  })
  .catch( (err) => {
    console.log('error');
  })
});


// DELETE AN ITEM FROM THE DATABASE

cart.delete("/cart-items/:id", (req, res) => {
  let data = req.body;
  pool.query(
    "DELETE FROM ShoppingCart WHERE id=$1::int", 
    [req.params.id]
  )
  .then( () => {
    res.status(201); // Created
    res.send('Successfully deleted an item!');
  })
  .catch( (err) => {
    console.log('error');
  })
});



// can export one thing as object
module.exports = cart;