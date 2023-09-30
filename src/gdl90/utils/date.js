export function secondsSinceMidnight(date) {
	const midnight = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		0,
		0,
		0
	);
	const diffMs = date.getTime() - midnight.getTime();

	return diffMs / 1000;
}
