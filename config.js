//config file - for assigning the port number and the mongoDB username and password

//call instance of dotenv
const dotenv = require("dotenv").config();

// assign port number - default to 3000 if process.env.PORT fails.
port = process.env.PORT || 3000;

//exports variables needed in other files in the folder.
module.exports = {
    port: port,
    user: process.env.USER,
    password: process.env.PASS,
}
