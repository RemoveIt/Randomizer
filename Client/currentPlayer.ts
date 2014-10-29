class CurrentPlayer extends Player implements IKeyboardListener {

	constructor(data: PlayerData) {
		super(data);
		//KeyboardManager.AddListener(this);
	}

	OnKeyPress(keyCode: number) {
		if (keyCode === 38) {
			this.Sprite.position.y += 1;
		}

		if (keyCode === 37) {
			this.Sprite.position.x += 1;
		}
	}

	OnKeyRelease(keyCode: number) {

	}
}