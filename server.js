// require the Express module
const express = require("express");
// creates an instance of an Express server
const app = express();

//import cartItems route
const items = require('./cartItems');
//convert params and body into usable JSON
app.use(express.json());


// use and setup students route
app.use("/", items);

// define the port
const port = 3000;

// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));