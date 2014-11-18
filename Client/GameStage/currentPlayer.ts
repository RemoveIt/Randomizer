///<reference path="./player.ts"/>

class CurrentPlayer implements IKeyboardListener {
	private socket: SocketIOClient.Socket;
	private lastKeyTime: number = 0;
	player: Player;

	constructor(plr: Player, socket: SocketIOClient.Socket) {
		this.player = plr;
		KeyboardManager.AddListener(this);
		this.socket = socket;
	}

	OnKeyPress(keyCode: number) {
		if (Date.now() - this.lastKeyTime < 200) { return; }
		if (keyCode === 37) {
			this.player.PixiContainer.position.x -= 70;
		}
		if (keyCode === 38) {
			this.player.PixiContainer.position.y -= 70;
		}
		if (keyCode === 39) {
			this.player.PixiContainer.position.x += 70;
		}
		if (keyCode === 40) {
			this.player.PixiContainer.position.y += 70;
		}

		this.player.Rotate(keyCode - 37);
		this.socket.emit("Player", {
			Type: "Moving", Data: [{
				ID: this.player.ID, Pos:
				{ x: this.player.PixiContainer.position.x, y: this.player.PixiContainer.position.y }, Rot: this.player.Rotation
			}]
		});
		this.lastKeyTime = Date.now();
	}

	OnKeyRelease(keyCode: number) {
	}

}
