import socketio = require("socket.io");
import Player = require("./player");

// move this shit to hash table when harmony
class PlayersManager {
	PlayerList: Player[] = [];

	Add(socket: socketio.Socket) {
		var newPlr = new Player(socket);
		this.PlayerList.push(newPlr);
		socket.emit("NewPlayer", { Range: ServerResoneRange.Specific, ID: [socket.id], Data: { Pos: newPlr.Pos, MovV: newPlr.MovingV } });
	}

	Get(ID: string): Player {
		for (var i = 0; i < this.PlayerList.length; i++) {
			if (ID == this.PlayerList[i].ID) {
				return this.PlayerList[i];
			}
			return null;
		}
	}

}

export = PlayersManager;
