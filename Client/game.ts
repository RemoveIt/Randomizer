class Game {

	Renderer: PIXI.IPixiRenderer;
	GameStage: GameStage;
	Socket: SocketIOClient.Socket;

	constructor(canvas: HTMLCanvasElement) {
		this.Socket = io.connect(window.location.href);
		this.Renderer = PIXI.autoDetectRenderer(800, 600, {
			view: canvas,
			antialiasing: false,
			transparent: false,
			resolution: 1
		});
		this.GameStage = new GameStage(this.Socket);

	}

	Init() {

	}

	Render() {

		this.GameStage.Update();
		this.Renderer.render(this.GameStage.PixiStage);
	}
} 
