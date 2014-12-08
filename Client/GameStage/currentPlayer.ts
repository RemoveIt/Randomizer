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
			if (evt.keyCode - 37 !== this.player.Rotation) {
				this.player.Rotate(evt.keyCode - 37);
				var data = { ID: this.player.ID, Pos: { x: this.player.Pos.x, y: this.player.Pos.y }, Rot: this.player.Rotation };
				this.socket.emit("Player", { Type: "Moving", Data: [data] });
				return;
			}
		}

		if (this.player.Busy) { return; }
		//Ability
		if (String.fromCharCode(evt.keyCode).toUpperCase().search(/[A-Z]/) !== -1) {
			this.player.AbilityKeyPress(String.fromCharCode(evt.keyCode).toUpperCase(), (Abidata: AbilityData) => {
				this.socket.emit("Player", {
					Type: "Ability", Data: [Abidata]
				});
				this.player.PerformAbility(Abidata);
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

		if (this.player.Rotation === Rotation.Left && !this.ground.CollisionMap[this.player.Pos.x - 1][this.player.Pos.y]) {
			tmpV.x -= 1;
		}
		if (this.player.Rotation === Rotation.Up && !this.ground.CollisionMap[this.player.Pos.x][this.player.Pos.y - 1]) {
			tmpV.y -= 1;
		}
		if (this.player.Rotation === Rotation.Right && !this.ground.CollisionMap[this.player.Pos.x + 1][this.player.Pos.y]) {
			tmpV.x += 1;
		}
		if (this.player.Rotation === Rotation.Down && !this.ground.CollisionMap[this.player.Pos.x][this.player.Pos.y + 1]) {
			tmpV.y += 1;
		}
		var data = { ID: this.player.ID, Pos: { x: this.player.Pos.x + tmpV.x, y: this.player.Pos.y + tmpV.y }, Rot: this.player.Rotation };
		this.player.Move(data);
		this.socket.emit("Player", { Type: "Moving", Data: [data] });
	}

	OnKeyRelease(evt: KeyboardEvent) {
	}

}
