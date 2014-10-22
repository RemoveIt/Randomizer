import express = require("express");
var app = express();
var serveStatic = require("serve-static");

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(serveStatic('./static', { 'index': ['index.html'] }));

io.on('connection', function (socket) {
    console.log('a user connected');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
