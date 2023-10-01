import dgram from 'dgram';
import { HearbeatMessage, Message } from './messages';
import { Ownership } from './messages/ownership';

const DEFAULT_OPTIONS = {
	dgram: dgram,
	host: 'localhost',
	port: 4000,
};

export class GDL90 {
	/**
	 * @private
	 * @type {dgram}
	 */
	_dgram;

	/**
	 * @private
	 * @type {string}
	 */
	_host;

	/**
	 * @private
	 * @type {number}
	 */
	_port;

	/**
	 * @private
	 */
	_socket;

	/**
	 * @private
	 */
	_interval;

	/**
	 * @param {object} [options]
	 * @param {dgram} [options.dgram] Datagram library for sending data over UDP. Defaults to Node's implementation
	 * @param {string} [options.host] Host address to broadcast on. Defaults to localhost
	 * @param {number} [options.port] Port to broadcast on. Defaults to 4000
	 */
	constructor(options = {}) {
		const optionsWithDefaults = { ...DEFAULT_OPTIONS, ...options };

		this._dgram = optionsWithDefaults.dgram;
		this._host = optionsWithDefaults.host;
		this._port = options.port;
	}

	/**
	 * Opens the UDP connection and starts to GDL-90 broadcast
	 * @returns {Promise} resolves once connection is established
	 */
	connect() {
		return new Promise((resolve, reject) => {
			this._socket = this._dgram.createSocket('udp4');

			this._socket.on('error', reject);

			this._socket.bind(() => {
				this._socket.setBroadcast(true);

				this._startHeartbeat();

				resolve();
			});
		});
	}

	/**
	 * Closes the connection and stops the GDL-90 broadcast
	 */
	close() {
		if (this._interval) clearInterval(this._interval);

		this._socket.close();
	}

	/**
	 * @private
	 * @param {Message} message
	 */
	_sendMessage(message) {
		const messageBuffer = message.getValue();

		this._socket.send(
			messageBuffer,
			0,
			messageBuffer.length,
			this._port,
			this._host
		);
	}

	/**
	 * @private
	 */
	_startHeartbeat() {
		this._interval = setInterval(() => {
			this._sendMessage(new HearbeatMessage());
			this._sendMessage(new Ownership());
		}, 1000);
	}
}
