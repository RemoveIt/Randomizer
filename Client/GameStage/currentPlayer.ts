///<reference path="./player.ts"/>

class CurrentPlayer extends Player implements IKeyboardListener {
	private socket: SocketIOClient.Socket;

	constructor(data: PlayerFullData, socket: SocketIOClient.Socket) {
		super(data);
		KeyboardManager.AddListener(this);
		this.socket = socket;
	}

	OnKeyPress(keyCode: number) {
		this.CheckKeys();
	}

	OnKeyRelease(keyCode: number) {
		this.CheckKeys();
	}

	private CheckKeys() {
		var tmpV = { x: 0, y: 0 };

		if (KeyboardManager.keys[37]) {
			tmpV.x -= 1;
		}
		if (KeyboardManager.keys[38]) {
			tmpV.y -= 1;
		}
		if (KeyboardManager.keys[39]) {
			tmpV.x += 1;
		}
		if (KeyboardManager.keys[40]) {
			tmpV.y += 1;
		}

		this.MovingV = tmpV;

		this.socket.emit("Player", { Type: "Moving", Data: [{ ID: this.ID, Pos: { x: this.Sprite.position.x, y: this.Sprite.position.y }, MovV: this.MovingV }] });


	}

}
