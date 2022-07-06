const app = require("./server");
//calls for express server

const config = require("./config");
//pulls in exported variables from config

var server = app.listen(config.port, () => {
    console.log(`Port running on ${config.port}`)
})

onConnect(() => {
    app.listen(config.http_port, () => {
        console.log(`Listening on port ${config.http_port}`);
    });
});