///<reference path="./player.ts"/>

class CurrentPlayer implements IKeyboardListener {
	private socket: SocketIOClient.Socket;
	private lastKeyTime: number = 0;
	private ground: Ground;
	player: Player;

	constructor(plr: Player, socket: SocketIOClient.Socket, ground: Ground) {
		this.player = plr;
		KeyboardManager.AddListener(this);
		this.socket = socket;
		this.ground = ground;
	}

	OnKeyPress(evt: KeyboardEvent) {
		// Rotation
		if (evt.keyCode >= 37 && evt.keyCode <= 40) {
			var rotationFromKeyCode = evt.keyCode - 37;
			if (rotationFromKeyCode !== this.player.Rotation) {
				this.player.Rotate(rotationFromKeyCode);
				var data = {
					ID: this.player.ID,
					Pos: { x: this.player.TilePos.x, y: this.player.TilePos.y },
					Rot: this.player.Rotation
				};
				this.socket.emit("Player", { Type: "Moving", Data: [data] });
				return;
			}
		}

		if (this.player.Busy) { return; }
		//Ability
		if (this.isKeyCodeKeyLetter(evt.keyCode)) {
			this.player.AbilityKeyPress(String.fromCharCode(evt.keyCode).toUpperCase(),
				(Abidata: AbilityData) => {
					this.socket.emit("Player", { Type: "Ability", Data: [Abidata] });
				});
			return;
		}

		if (Date.now() - this.lastKeyTime < this.player.MoveCooldown) { return; }

		//Movement
		if (evt.keyCode === 17) {
			this.Move();
		}

		this.lastKeyTime = Date.now();
	}

	private Move() {
		var tmpV = { x: 0, y: 0 };
		if (this.player.Rotation === Rotation.Left && !this.ground.GetCollision(this.player.TilePos.x, this.player.TilePos.y, Rotation.Left)) {
			tmpV.x -= 1;
		}
		if (this.player.Rotation === Rotation.Up && !this.ground.GetCollision(this.player.TilePos.x, this.player.TilePos.y, Rotation.Up)) {
			tmpV.y -= 1;
		}
		if (this.player.Rotation === Rotation.Right && !this.ground.GetCollision(this.player.TilePos.x, this.player.TilePos.y, Rotation.Right)) {
			tmpV.x += 1;
		}
		if (this.player.Rotation === Rotation.Down && !this.ground.GetCollision(this.player.TilePos.x, this.player.TilePos.y, Rotation.Down)) {
			tmpV.y += 1;
		}
		var data = {
			ID: this.player.ID,
			Pos: { x: this.player.TilePos.x + tmpV.x, y: this.player.TilePos.y + tmpV.y },
			Rot: this.player.Rotation
		};
		this.player.Move(data);
		this.socket.emit("Player", { Type: "Moving", Data: [data] });
	}

	private isKeyCodeKeyLetter(keyCode: number): boolean {
		return String.fromCharCode(keyCode).toUpperCase().search(/[A-Z]/) !== -1;
	}

	OnKeyRelease(evt: KeyboardEvent) { }
}
