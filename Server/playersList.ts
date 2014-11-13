import Player = require("./player");
import socketio = require("socket.io");

class PlayersList {
	List: Player[] = [];


	Add(socket: socketio.Socket) {
		var newPlr = new Player(socket);
		this.List.push(newPlr)
	}

	Get(ID: string): Player {
		for (var i = 0; i < this.List.length; i++) {
			if (ID === this.List[i].ID) {
				return this.List[i];
			}
		}
		return null;
	}

	Remove(ID: string) {
		for (var i = 0; i < this.List.length; i++) {
			if (this.List[i].ID === ID) {
				this.List.splice(i, 1);
			}
		}
	}

	GetFullDataOfAllPlayers(): PlayerFullData[] {
		var result = [];
		for (var i = 0; i < this.List.length; i++) {
			var tmp = { ID: this.List[i].ID, Pos: this.List[i].Pos };
			result.push(tmp);
		}

		return result;
	}
}

export = PlayersList;
