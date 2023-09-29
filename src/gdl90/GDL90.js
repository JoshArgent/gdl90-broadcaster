import dgram from 'dgram';

export class GDL90 {
	/**
	 * @type {dgram}
	 */
	dgram;

	constructor(dgram) {
		this.dgram = dgram;
	}

	async connect() {
		const socket = this.dgram.createSocket('udp4');

		socket.bind(() => {
			socket.setBroadcast(true);

			const message = Buffer.from('Hello World!');

			socket.send(
				message,
				0,
				message.length,
				63093,
				'localhost',
				function () {
					console.log("Sent '" + message + "'");
				}
			);
		});
	}
}
