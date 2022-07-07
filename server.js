//Create all app request functions (app.get, app.post, app.delete) in this file, and export "app"

const express = require("express")
//calls in express
const app = express()
//calls an instance of express

const cors = require("cors");
const { process_params } = require("express/lib/router");
//calls in cors - allows for middleware site authentication
app.use(cors({
    credentials: true,
    origin: true
}));
// ^ This allows for...?
app.use(express.json({}));
//.json parser - tells your app to use .json

const sessionSetUp = require("./session");
sessionSetUp(app);
// ^ This calls the session folder, which contains




app.use(express.static(`${__dirname}/public/`));
//tells the backend to serve the UI

module.exports = app;
//exports variables needed in other files. In this case, the variable for express.js

