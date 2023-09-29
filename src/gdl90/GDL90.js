import dgram from 'dgram';

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

				const message = Buffer.from('Hello World!');

				this._socket.send(
					message,
					0,
					message.length,
					63093,
					'localhost',
					function () {
						console.log("Sent '" + message + "'");
					}
				);

				resolve();
			});
		});
	}
}
