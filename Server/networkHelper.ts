import socketio = require("socket.io");

class NetworkHelper {

	static Send(socket: socketio.Socket, namestring: string, data: ServerResponse) {
		socket.emit(namestring, data);
	}
}

export = NetworkHelper;
