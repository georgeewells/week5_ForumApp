//Create all app request functions (app.get, app.post, app.delete) in this file, and export "app"

const express = require("express")
//calls in express
const app = express()
//calls an instance of express

const cors = require("cors");
const { process_params } = require("express/lib/router");
const { user, user, user, user } = require("./config");
//calls in cors - allows for middleware site authentication
app.use(cors({
    credentials: true,
    origin: true
}));
// ^ This allows for...?

app.use(express.json({}));
//.json parser - tells your app to use .json

//const sessionSetUp = require("./session");
//sessionSetUp(app);
// ^ This calls the session folder, which initializes express-session - this is middleware that develops cookies for short-term memory

//const authSetUp = require("./auth");
//authSetUp(app);
// ^ Calls the auth.js file, and connects it to server

//const { Thread, Post, User } = require("./model");
// ^ Calls model.js file with Thread, Post, and User variables.

app.use((req, res, next) => {
    console.log(`request hitting ${req.method} ${req.url}`);
    next();
});
// ^ This sets up a basic logging middleware -- NEED EXPLANATION

app.use(express.static(`${__dirname}/public/`));
//tells the backend to serve the UI

//creating a user
app.post("/user", (req, res) => {
    user.create({
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password,
    })
    // ^ Saves the data for the username, fullname, and password submitted in a request body
    .then((user) => {
        res.status(201).json(user)
        //Checks for a good response
    })
    .catch((err) => {
        res.status(500).json({
            message: 'post request failed to create user',
            error: err,
        });
    });
});

//This handler is what is used to get a single thread from the database.
app.get("/thread/:id", async(req, res) => {
    console.log(`request to get a single thread with id ${req.params.id}`);
    // ^ Returns a console log that prints this message with the requested id
    
    let thread;
    // gets the thread...
    try {
    //runs a function complete with an error message
        thread == await thread.findById(req.params.id);
        // ^ retrieves the thread with the matching id parameter
        if (thread == null) {
        // ^ thread variable will be null if there was no match for the id
            res.status(404).json({
            // ^ returns a 404 - a not found error
                message: `Thread not found.`
            });
            return;
            //ends the request, as running further code will break the system.
        }
        thread = thread.toObject();
        // inputs thread variable to object in database if not null
      } catch (err) {
        // ^ if theres an error...
        res.status(500).json({
        // ^ returns a 500 error as the status
            message: `GET request failed to get thread.`,
            // ^ returns informative message
            error: err,
            // ...?
        });
    } 
    //Retrieve the user that created the post here
    try{
        let user = await user.findByID(thread.user_id, "-password");
        thread.user = user;
      } catch (err) {
        console.log(
            `unable to get user ${thread.user_id} when getting thread ${thread._id}`
        );
      }

    // get the posts users
    for (let k in thread.posts) {
        try {
            let user = await user.findById(thread.posts[k].user_id, "-password");
            thread.posts[k].user = user;
          } catch (err) {
            console.log(
                `unable to get user ${thread.posts[k].user_id} for post ${thread.posts[k]._id} when getting thread ${thread._id}: ${err}`
        );
      }
    }
    res.status(200).json(thread);
    //returns a 200 status - no issues and thread was returned.
});

app.get("/thread", async (req, res) => {
    console.log(`Request to get all threads:`);

    let threads;
    try {
        threads = await Thread.find({}, "-posts");
    
  } catch (err) {
        res.status(500).json({
            message: `get request failed to get thread.`,
            error: err,
        });
    }

    for (let k in threads) {
        try {
            threads[k] = threads[k].toObject();
            let user = await user.findById(threads[k].user_id, "-password");
            threads[k].user = user;
        } catch (err) {
            console.log(
                `unable to get user ${threads[k].user_id} when getting thread ${threads[k]._id}: ${err}`
            );
        };
    }

})









module.exports = app;
//exports variables needed in other files. In this case, the variable for express.js

