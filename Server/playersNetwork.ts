import socketio = require("socket.io");
import PlayersList = require("./playersList");

class PlayersNetwork {

	private playersList: PlayersList;
	constructor(playersList: PlayersList) {
		this.playersList = playersList;
	}

	SetupConnection(socket: socketio.Socket) {
		socket.on("Player", (data: ServerResponse) => {

			if (data.Type === "Moving") {
				socket.broadcast.emit("Player", data);
				var tmpPlr = this.playersList.Get(socket.id);
				tmpPlr.Pos = data.Data[0].Pos;
			}

			if (data.Type === "Ability") {
				socket.broadcast.emit("Player", data);
				console.log(JSON.stringify(data));
			}

		});
	}

}

export = PlayersNetwork;
