class MuddyHag extends Player {

	private standSpr: PIXI.Sprite;
	private teleportAnim: PIXI.MovieClip;

	constructor(data: PlayerFullData) {
		super(data);
		this.standSpr = PIXI.Sprite.fromImage(config.Players[Champions.MuddyHag].Picture);
		this.PixiContainer.addChild(this.standSpr);
		var textures: PIXI.Texture[] = [];
		for (var i = 0; i < config.Players[0].Skills.Q.Anim.Files.length; i++) {
			var src = config.Players[0].Skills.Q.Anim.Path + config.Players[0].Skills.Q.Anim.Files[i];
			textures.push(PIXI.Texture.fromImage(src));
		}

		this.teleportAnim = new PIXI.MovieClip(textures);
		this.teleportAnim.visible = false;
		this.teleportAnim.animationSpeed = 0.5;
		this.PixiContainer.addChild(this.teleportAnim);
	}

	UseAbility(keyLetter: string) {
		if (keyLetter === 'Q') {
			this.standSpr.visible = false;
			this.teleportAnim.visible = true;
			this.teleportAnim.loop = false;
			this.teleportAnim.onComplete = () => {
				this.standSpr.visible = true;
				this.teleportAnim.visible = false;
			}
			this.teleportAnim.gotoAndPlay(0);
		}
	}
}
