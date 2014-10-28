class Game {

	Renderer: PIXI.IPixiRenderer;
	CurrStage: PIXI.Stage;

	constructor(canvas: HTMLCanvasElement) {
		var socket = io.connect(window.location.href);
		this.Renderer = PIXI.autoDetectRenderer(800, 600, canvas);
		this.CurrStage = new PIXI.Stage(0);
	}

	Init() {
	
	}

	Render() {
		this.Renderer.render(this.CurrStage);
	}
} 
