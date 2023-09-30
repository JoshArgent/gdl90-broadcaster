import dgram from 'dgram';
import { HearbeatMessage, Message } from './messages';
import { bits, buffer } from 'bitwise';
import { Ownership } from './messages/ownership';

const SOCKET = 4000;
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

				this._startHeartbeat();

				resolve();
			});
		});
	}

	/**
	 * @param {Message} message
	 */
	sendMessage(message) {
		const messageBuffer = message.getValue();

		const bitsArr = buffer.read(messageBuffer);
		console.log(bits.toString(bitsArr, 8));

		this._socket.send(messageBuffer, 0, messageBuffer.length, SOCKET, HOST);
	}

	_startHeartbeat() {
		setInterval(() => {
			this.sendMessage(new HearbeatMessage());
			this.sendMessage(new Ownership());
		}, 1000);
	}
}
