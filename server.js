// require the Express module
const express = require("express");

// creates an instance of an Express server
const app = express();

// server.js, any file with a created and configured Express app
app.use(express.static('./public'));

// //import cartItems route
const items = require('./cartItems');

//convert params and body into usable JSON
app.use(express.json());


const pg = require("pg");

const pool = new pg.Pool({
  user: "postgres",
  password: "M4gQ39Gj3BJg_m6KEb7ZTe7eA88JhkaX",
  host: "localhost",
  port: 5432,
  database: "postgres",
  ssl: false
});



// // use and setup items route
app.use("/", items);


// define the port
const port = 3000;

// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));