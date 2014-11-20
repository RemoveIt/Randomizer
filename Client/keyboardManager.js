var KeyboardManager = (function () {
    function KeyboardManager() {
    }
    KeyboardManager.AddListener = function (listener) {
        this.listenerList.push(listener);
    };

    KeyboardManager.Start = function () {
        addEventListener("keydown", function (keyEvent) {
            if (KeyboardManager.keys[keyEvent.keyCode])
                return;
            KeyboardManager.keys[keyEvent.keyCode] = true;
            for (var i = 0; i < KeyboardManager.listenerList.length; i++) {
                KeyboardManager.listenerList[i].OnKeyPress(keyEvent.keyCode);
            }
        });

        addEventListener("keyup", function (keyEvent) {
            KeyboardManager.keys[keyEvent.keyCode] = false;
            for (var i = 0; i < KeyboardManager.listenerList.length; i++) {
                KeyboardManager.listenerList[i].OnKeyRelease(keyEvent.keyCode);
            }
        });
    };
    KeyboardManager.listenerList = new Array();
    KeyboardManager.keys = new Array(200);
    return KeyboardManager;
})();
