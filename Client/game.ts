class Game {

	Renderer: PIXI.IPixiRenderer;
	GameStage: GameStage;
	Socket: SocketIOClient.Socket;

	constructor(canvas: HTMLCanvasElement) {
		this.Socket = io.connect(window.location.href);
		this.Renderer = PIXI.autoDetectRenderer(1000, 700, {
			view: canvas,
			antialiasing: false,
			transparent: false,
			resolution: 1
		});

		this.GameStage = new GameStage(this.Socket);
		
	}

	Init() {
		this.GameStage.Start(() => { });
	}

	Render() {
		var FPS = this.CalcFPS();
		this.GameStage.Update(FPS);
		this.Renderer.render(this.GameStage);
	}

	private lastFpsTime = 0;
	private CalcFPS(): number {
		var currTime = window.performance.now();
		var deltaTime = currTime - this.lastFpsTime;
		this.lastFpsTime = currTime;
		return 1000 / deltaTime;
		
	}
} 
