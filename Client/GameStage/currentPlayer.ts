///<reference path="./player.ts"/>

class CurrentPlayer implements IKeyboardListener {
	private socket: SocketIOClient.Socket;
	private lastKeyTime: number = 0;
	private busy = false;
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
				this.SendMovingData();
				return;
			}
		}

		if (this.busy) { return; }
		//Ability
		if (String.fromCharCode(evt.keyCode).toUpperCase().search(/[A-Z]/) !== -1) {
			this.player.AbilityKeyPress(String.fromCharCode(evt.keyCode).toUpperCase(), (Abidata: AbilityData) => {
				this.busy = true;
				this.socket.emit("Player", {
					Type: "Ability", Data: [Abidata]
				});
				this.player.PerformAbility(Abidata, () => {
					this.busy = false;
				})
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

		if (this.player.Rotation === Rotation.Left && !this.ground.CollisionMap[this.player.Pos.x - 1][this.player.Pos.y]) {
			this.player.Pos.x -= 1;
		}
		if (this.player.Rotation === Rotation.Up && !this.ground.CollisionMap[this.player.Pos.x][this.player.Pos.y - 1]) {
			this.player.Pos.y -= 1;
		}
		if (this.player.Rotation === Rotation.Right && !this.ground.CollisionMap[this.player.Pos.x + 1][this.player.Pos.y]) {
			this.player.Pos.x += 1;
		}
		if (this.player.Rotation === Rotation.Down && !this.ground.CollisionMap[this.player.Pos.x][this.player.Pos.y + 1]) {
			this.player.Pos.y += 1;
		}

		this.player.PixiContainer.position.x = this.player.Pos.x * 70 + 35;
		this.player.PixiContainer.position.y = this.player.Pos.y * 70 + 35;
		this.SendMovingData();
	}


	private SendMovingData() {
		this.socket.emit("Player", {
			Type: "Moving", Data: [{
				ID: this.player.ID,
				Pos: { x: this.player.Pos.x, y: this.player.Pos.y },
				Rot: this.player.Rotation
			}]
		});
	}

	OnKeyRelease(evt: KeyboardEvent) {
	}

}
