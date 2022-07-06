const mongoose = require("mongoose");
//Calls for mongoose to connect to MongoDB

const db = mongoose.connection;
//calls for instance of mongoose

async function connect(user, password) {
    let connectionString = `mongodb+srv://${user}:${password}@codeschooltrial.wptdi3c.mongodb.net/?retryWrites=true&w=majority`
}


