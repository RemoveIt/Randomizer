window.onload = function () {
 
	var game = new Game(<HTMLCanvasElement> document.getElementById("GameCanvas"));
  

	function Loop() {

		game.Render();
		requestAnimationFrame(Loop);

	}

	requestAnimationFrame(Loop);
}
