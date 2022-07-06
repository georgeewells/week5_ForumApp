//THIS is as big as the file will ever be. It creates the connection into the Mongo DB Atlas database. 


const mongoose = require("mongoose");
//Calls for mongoose to connect to MongoDB

const db = mongoose.connection;
//calls for instance of mongoose

//creates function called "connect()" that connects to mongoose (and returns an error if failed)
async function connect(user, password) {
    // set connectionString variable to MongoDB database string
    let connectionString = `mongodb+srv://${user}:${password}@codeschooltrial.wptdi3c.mongodb.net/?retryWrites=true&w=majority`
    
    //attempts to connect to mongoose using connection string
    try {
        await mongoose.connect(connectionString, {
            useNewURLParser: true,
            useUnifiedTopology: true,
        });
    //if error, catches error and returns log
    } catch(err){
        console.log(`Error connecting to mongoose: ${err}`)
    }
 }


 //function called onConnect() that checks the connection to Mongoose, and returns...?
 function onConnect(callback) {
    db.once("open", function() {
        console.log("Connected to Mongoose");
        callback()
    });
    db.once("error", (err) => {
        console.log(`error connecting to mongoose: ${err}`)
    });
 }

 

 module.exports = {
     connect: connect, 
     onConnect: onConnect,
 };



