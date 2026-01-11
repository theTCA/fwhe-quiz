/**
 * Shuffle array
 * @param {any[]} array the array to shuffle
 * @returns {any[]} shuffled array
 */
export function shuffle(array) {
	var m = array.length,
		t,
		i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

/**
 * Test if storage is supported and available
 * @param {string} type
 */
export function storageAvailable(type) {
	let storage;
	try {
		// @ts-ignore
		storage = window[type];
		const x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			(e.code === 22 ||
				e.code === 1014 ||
				e.name === 'QuotaExceededError' ||
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			storage &&
			storage.length !== 0
		);
	}
}
