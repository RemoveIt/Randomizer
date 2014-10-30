import express = require("express");
import socketio = require("socket.io");
var serveStatic = require("serve-static");


class Server {

	expressApp: express.Application;
	socketServer: socketio.Server;
	http;
	constructor() {
		this.expressApp = express();
		this.http = require('http').Server(this.expressApp);
		this.socketServer = socketio(this.http);
	}

	Start() {
		this.expressApp.use(serveStatic('./static', { 'index': ['index.html'] }));
		this.http.listen(3000, () => {
			console.log('listening on *:3000');
		});
	}
}

export = Server;
