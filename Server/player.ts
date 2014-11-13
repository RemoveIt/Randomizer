import socketio = require("socket.io");

class Player {
	ID: string;
	Socket: socketio.Socket;
	Pos: IPoint;
	//MovingV: IPoint;

	constructor(socket:socketio.Socket) {
		this.ID = socket.id;
		this.Socket = socket;
		this.Pos = { x: (Math.random() * 500) | 80, y: (Math.random() * 500) | 80 };
		//this.MovingV = { x: 0, y: 0 };
	}

	Move(movingData: MovingData) {
		//this.MovingV = movingData.MovV;
		this.Pos = movingData.Pos;
	}
}

export = Player;
