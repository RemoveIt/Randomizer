import NetworkHelper = require("./networkHelper");
import PlayersNetwork = require("./playersNetwork");
import Player = require("./player");
import PlayersList = require("./playersList");
import socketio = require("socket.io");

// move this shit to hash table when harmony
class PlayersManager {

	PlayersList = new PlayersList();
	private playersNetwork: PlayersNetwork;

	constructor() {
		this.playersNetwork = new PlayersNetwork(this.PlayersList);
	}

	Add(socket: socketio.Socket) {
		NetworkHelper.Send(socket, "Player", { Type: "New", Data: this.PlayersList.GetFullDataOfAllPlayers() });

		this.PlayersList.Add(socket);
		var newPlr = this.PlayersList.Get(socket.id);

		NetworkHelper.Send(socket, "FirstPlayer", { Data: [{ ID: socket.id, Pos: newPlr.Pos}] });
		socket.broadcast.emit("Player", { Type: "New", Data: [{ ID: socket.id, Pos: newPlr.Pos }] });

		this.playersNetwork.SetupConnection(socket);
	}

	Remove(socket: socketio.Socket) {
		socket.broadcast.emit("Player", { Type: "Remove", Data: [{ ID: socket.id }] });
		this.PlayersList.Remove(socket.id);
		console.log("Removed");
	}
}

export = PlayersManager;
