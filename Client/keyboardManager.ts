class KeyboardManager {
	private static listenerList = new Array<KeyboardListener>();
    public static keys = new Array<boolean>(200);

    static AddListener(listener: KeyboardListener) {
		this.listenerList.push(listener);
	}

	static Start() {
        addEventListener("keydown", (keyEvent) => {
            KeyboardManager.keys[keyEvent.keyCode] = true;
            for (var i = 0; i < KeyboardManager.listenerList.length; i++) {
                KeyboardManager.listenerList[i].OnKeyPress(keyEvent.keyCode);
			}
		});

        addEventListener("keyup", (keyEvent) => {
            KeyboardManager.keys[keyEvent.keyCode] = false;
            for (var i = 0; i < KeyboardManager.listenerList.length; i++) {
                KeyboardManager.listenerList[i].OnKeyRelease(keyEvent.keyCode);
			}
		});
	}
}

interface KeyboardListener {
	OnKeyPress(keyCode: number);
	OnKeyRelease(keyCode: number);
}
