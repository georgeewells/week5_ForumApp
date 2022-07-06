const dotenv = require("dotenv").config();

port = process.env.PORT || 3000;

module.exports = {
    port: port,
    user: process.env.USER,
    password: process.env.PASS,
}