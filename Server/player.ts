import socketio = require("socket.io");

class Player {
	ID: string;
	Socket: socketio.Socket;
	Pos: IPoint;

	constructor(socket: socketio.Socket) {
		this.ID = socket.id;
		this.Socket = socket;
		this.Pos = { x: ((Math.random() * 5) | 0) * 100, y: ((Math.random() * 5) | 0) * 100 };
		console.log(this.Pos.x + " " + this.Pos.y);

	}

	Move(movingData: MovingData) {
		this.Pos = movingData.Pos;
	}
}

export = Player;
