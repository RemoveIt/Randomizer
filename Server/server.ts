import express = require("express");
import socketio = require("socket.io");
var serveStatic = require("serve-static");
import PlayersManager = require("./playersManager");

class Server {

	expressApp: express.Application;
	socketServer: socketio.Server;
	http;
	playersManager = new PlayersManager();

	constructor() {
		this.expressApp = express();
		this.http = require("http").Server(this.expressApp);
		this.socketServer = socketio(this.http);
	}

	Start() {

		this.expressApp.use(serveStatic("./static", { index: ["index.html"] }));
		this.http.listen(2137, () => {
			console.log("listening on *:3000");
		});

		this.socketServer.on("connection", (socket) => {
			this.playersManager.Add(socket);

			socket.on('disconnect',  () => {
				this.playersManager.Remove(socket);
			});

		});


	}
}

export = Server;
