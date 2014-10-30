
window.onload = function () {

	var game = new Game(<HTMLCanvasElement> document.getElementById("GameCanvas"));
	KeyboardManager.Start();

	function Loop() {
		requestAnimationFrame(Loop);
		game.Render();
	}

	requestAnimationFrame(Loop);
}
