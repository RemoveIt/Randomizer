import http = require("http");
import express = require("express");
import socketio = require("socket.io");

var app = express();

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

http.createServer(app).listen(3000, function () {
    console.log('listening on *:3000');
});