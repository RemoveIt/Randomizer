import socketio = require("socket.io");

class PlayersNetwork {

	static SetupConnection(socket: socketio.Socket) {
		socket.on("Player", () => {

		});
	}

}

export = PlayersNetwork;
