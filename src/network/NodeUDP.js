import { IUDP } from './IUDP';
import dgram from 'dgram';

export class NodeUDP extends IUDP {
	_socket;

	bind(callback, errorCallback) {
		this._socket = dgram.createSocket('udp4');

		this._socket.on('error', errorCallback);

		this._socket.bind(callback);
	}

	send(msg, offset, length, port, address) {
		this._socket.send(msg, offset, length, port, address);
	}

	closeSocket() {
		this._socket.close();
	}
}
