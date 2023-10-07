import { IUDP } from './IUDP';

export class NodeUDP extends IUDP {
	_socket;

	constructor(dgramImp) {
		this._dgram = dgramImp;
	}

	bind(callback, errorCallback) {
		// TODO Support dgramImp option

		import('dgram')
			.then(dgram => {
				this._socket = dgram.createSocket('udp4');

				this._socket.on('error', errorCallback);

				this._socket.bind(callback);
			})
			.catch(errorCallback);
	}

	send(msg, offset, length, port, address) {
		this._socket.send(msg, offset, length, port, address);
	}

	closeSocket() {
		this._socket.close();
	}
}
