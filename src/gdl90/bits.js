export class Byte {
	bits = [0, 0, 0, 0, 0, 0, 0, 0];

	constructor(bits) {
		this.bits = sanitizeBits(bits, 8);
	}

	getValue() {
		let value = 0;

		this.bits.forEach(bit => {
			value = value << 1;
			value = value | bit;
		});

		return value;
	}
}

function sanitizeBits(bits, expectedLength) {
	const bitsCopy = [...bits];

	if (bits.length > expectedLength) {
		throw new Error(
			'Too many bits! Expected ' +
				expectedLength +
				' but got ' +
				bits.length +
				'.'
		);
	}

	const isEveryBitValid = bits.every(bit => bit === 0 || bit === 1);

	if (!isEveryBitValid) {
		throw new Error(`Invalid bit [${bits}].`);
	}

	if (bitsCopy.length < expectedLength) {
		for (let i = bitsCopy.length; i < expectedLength; i++) {
			bitsCopy.unshift(0);
		}
	}

	return bitsCopy;
}
