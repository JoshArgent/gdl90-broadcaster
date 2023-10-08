import { IUDP } from './IUDP';

/**
 * React Native implementation of UDP. Requires `react-native-udp` package installed.
 */
export class ReactNativeUDP extends IUDP {
	_socket;

	bind(callback, errorCallback) {
		import('react-native-dgram')
			.then(dgram => {
				this._socket = dgram.createSocket('udp4');

				this._socket.on('error', errorCallback);

				this._socket.bind(callback);
			})
			.catch(() =>
				errorCallback(
					new Error(
						'Error importing react-native-dgram. Make sure it is installed'
					)
				)
			);
	}

	send(msg, offset, length, port, address) {
		this._socket.send(msg, offset, length, port, address);
	}

	closeSocket() {
		this._socket.close();
	}
}
