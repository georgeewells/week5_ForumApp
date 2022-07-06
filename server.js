//Create all app request functions (app.get, app.post, app.delete) in this file, and export "app"

const express = require("express")
//calls in express

const app = express()
//calls an instance of express

app.use(express.json());
//tells your app to use .json

app.use(express.static(`${__dirname}/public/`));
//tells the backend to serve the UI

module.exports = app;