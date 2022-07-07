//THIS is how big this file will ever be. It only needs to call the other parts of the app (the database, 
//   the port, and the front-end). This will be the file you call to run.

const app = require("./server");
//calls for express server

const config = require("./config");
//pulls in exported variables from config

const connect = require("./persist/connect");

var server = app.listen(config.port, () => {
    console.log(`Port running on ${config.port}`)
})

connect.onConnect(() => {
    app.listen(config.http_port, () => {
        console.log(`Listening on port ${config.http_port}`);
    });
});