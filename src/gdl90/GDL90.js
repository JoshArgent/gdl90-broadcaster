import dgram from 'dgram';
import { HearbeatMessage } from './messages';

const SOCKET = 63093;
const HOST = 'localhost';
export class GDL90 {
	/**
	 * @type {dgram}
	 */
	dgram;

	_socket;

	constructor(dgram) {
		this.dgram = dgram;
	}

	connect() {
		return new Promise((resolve, reject) => {
			this._socket = this.dgram.createSocket('udp4');

			this._socket.on('error', reject);

			this._socket.bind(() => {
				this._socket.setBroadcast(true);

				const message = new HearbeatMessage().getValue();

				this._socket.send(message, 0, message.length, SOCKET, HOST);

				resolve();
			});
		});
	}
}
