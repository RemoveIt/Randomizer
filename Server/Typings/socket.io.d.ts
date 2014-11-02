// Type definitions for socket.io
// Project: http://socket.io/
// Definitions by: William Orr <https://github.com/worr>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


///<reference path='./node.d.ts' />


declare module "socket.io" {
	import http = require('http');

	//export function listen(server: http.Server, options: any, fn: Function): e.SocketManager;
	//export function listen(server: http.Server, fn?: Function): e.SocketManager;
	//export function listen(port: Number): e.SocketManager;

	function e(): e.Server;
	function e(server: http.Server, options?: any): e.Server;
	function e(port: number, options?: any): e.Server;


	module e {
		interface Socket {
			id: string;
			connected: boolean;
			json: any;
			log: any;
			volatile: any;
			broadcast: {
				emit(ev: any, ...data: any[]);
				send(data: any, fn: Function);
			};
			in(room: string): Socket;
			to(room: string): Socket;
			join(name: string, fn: Function): Socket;
			leave(name: string, fn: Function): Socket;
			set(key: string, value: any, fn: Function): Socket;
			get(key: string, fn: Function): Socket;
			has(key: string, fn: Function): Socket;
			del(key: string, fn: Function): Socket;
			disconnect(): Socket;
			send(data: any, fn: Function): Socket;
			emit(ev: any, ...data: any[]): Socket;
			on(ns: string, fn: Function): Socket;
			handshake: { address: string };
		}

		interface SocketNamespace {
			clients(room: string): Socket[];
			log: any;
			store: any;
			json: any;
			volatile: any;
			in(room: string): SocketNamespace;
			on(evt: string, fn: (socket: Socket) => void): SocketNamespace;
			to(room: string): SocketNamespace;
			except(id: any): SocketNamespace;
			send(data: any): any;
			emit(ev: any, ...data: any[]): Socket;
			socket(sid: any, readable: boolean): Socket;
			authorization(fn: Function): SocketNamespace;
		}

		interface Server {
			serveClient(v: boolean): Server;
			path(v: string): Server;

			get(key: any): any;
			set(key: any, value: any): Server;
			enable(key: any): Server;
			disable(key: any): Server;
			enabled(key: any): boolean;
			disabled(key: any): boolean;
			configure(env: string, fn: Function): Server;
			configure(fn: Function): Server;
			of(nsp: string): SocketNamespace;
			on(ns: string, fn: (socket:Socket) => void): Server;
			sockets: SocketNamespace;
		}

	}

	export = e;
}

