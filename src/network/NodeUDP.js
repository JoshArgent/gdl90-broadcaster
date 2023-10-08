import { IUDP } from './IUDP';

/**
 * Node implementation of UDP. Requires Node environment to work.
 */
export class NodeUDP extends IUDP {
	_socket;

	constructor(dgramImp) {
		this._dgram = dgramImp;
	}

	bind(callback, errorCallback) {
		const bindFn = dgram => {
			this._socket = dgram.createSocket('udp4');

			this._socket.on('error', errorCallback);

			this._socket.bind(callback);
		};

		if (this._dgram) {
			bindFn(this._dgram);
		} else {
			import('dgram')
				.then(dgram => bindFn(dgram))
				.catch(() =>
					errorCallback(new Error('Error importing Node dgram'))
				);
		}
	}

	send(msg, offset, length, port, address) {
		this._socket.send(msg, offset, length, port, address);
	}

	closeSocket() {
		this._socket.close();
	}
}
