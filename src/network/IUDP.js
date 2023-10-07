export class IUDP {
	/**
	 * Opens a new UDP4 socket and binds it. Calls the callback on success. Otherwise calls the errorCallback
	 * @param {Function} callback
	 * @param {Function<Error>} errorCallback
	 */
	bind(callback, errorCallback) {}

	/**
	 * Sends a message through the socket to the given address and port
	 * @param {Buffer} msg
	 * @param {integer} offset
	 * @param {integer} length
	 * @param {integer} port
	 * @param {string} address
	 */
	send(msg, offset, length, port, address) {}

	/**
	 * Closes the open socket
	 */
	closeSocket() {}
}
