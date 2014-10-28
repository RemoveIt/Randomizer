class Game {

	Renderer: PIXI.IPixiRenderer;
	GameStage: GameStage;
	
	constructor(canvas: HTMLCanvasElement) {
		var socket = io.connect(window.location.href);
		this.Renderer = PIXI.autoDetectRenderer(800, 600, canvas);
		this.GameStage = new GameStage();
	
	}

	Init() {
	
	}

	Render() {
		this.Renderer.render(this.GameStage.PixiStage);
	}
} 
