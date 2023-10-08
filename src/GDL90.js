import { HearbeatMessage, Message } from './messages';

// Remove dependency on Node's Buffer implementation
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const DEFAULT_OPTIONS = {
	host: 'localhost',
	port: 4000,
	logging: false,
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
	 * @private
	 */
	_logging;

	/**
	 * @param {object} [options]
	 * @param {dgram} options.dgram Datagram library for sending data over UDP.
	 * @param {string} [options.host] Host address to broadcast on. Defaults to localhost
	 * @param {number} [options.port] Port to broadcast on. Defaults to 4000
	 * @param {boolean} [options.logging] Log the broadcast output to the stdout in hex. Defaults to false.
	 */
	constructor(options = {}) {
		const optionsWithDefaults = { ...DEFAULT_OPTIONS, ...options };

		this._dgram = optionsWithDefaults.dgram;
		this._host = optionsWithDefaults.host;
		this._port = optionsWithDefaults.port;
		this._logging = optionsWithDefaults.logging;
	}

	/**
	 * Callback called every heartbeat
	 * @callback GDL90Heartbeat
	 * @param {HearbeatMessage} heartbeat
	 * @returns {Message[]} a number of additional messages to be broadcast (e.g. ownership report, traffic)
	 */

	/**
	 * Opens the UDP connection and starts to GDL-90 broadcast
	 * @param {GDL90Heartbeat} callback called each heartbeat
	 * @returns {Promise} resolves once connection is established
	 */
	async start(callback = () => {}) {
		await new Promise((resolve, reject) => {
			this._socket = this._dgram.createSocket('udp4');

			this._socket.on('error', reject);

			this._socket.bind(() => {
				this._startHeartbeat(callback);

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

		if (this._logging) {
			console.log(messageBuffer.toString('hex'));
		}

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
	_startHeartbeat(callback) {
		this._interval = setInterval(() => {
			const heartbeat = new HearbeatMessage();

			const otherMessages = callback(heartbeat) || [];

			this._sendMessage(heartbeat);

			otherMessages.forEach(message => {
				this._sendMessage(message);
			});
		}, 1000);
	}
}
