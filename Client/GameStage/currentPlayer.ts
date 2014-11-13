///<reference path="./player.ts"/>

class CurrentPlayer extends Player implements IKeyboardListener {
	private socket: SocketIOClient.Socket;
	private lastKeyTime: number = 0;

	constructor(data: PlayerFullData, socket: SocketIOClient.Socket) {
		super(data);
		KeyboardManager.AddListener(this);
		this.socket = socket;
	}

	OnKeyPress(keyCode: number) {
		if (Date.now() - this.lastKeyTime < 200) { return; }
		if (keyCode === 37) {
			this.Sprite.position.x -= 80;
		}
		if (keyCode === 38) {
			this.Sprite.position.y -= 80;
		}
		if (keyCode === 39) {
			this.Sprite.position.x += 80;
		}
		if (keyCode === 40) {
			this.Sprite.position.y += 80;
		}

		this.socket.emit("Player", { Type: "Moving", Data: [{ ID: this.ID, Pos: { x: this.Sprite.position.x, y: this.Sprite.position.y }, KeyCode: keyCode }] });
		this.lastKeyTime = Date.now();
	}

	OnKeyRelease(keyCode: number) {
	}

}
