/**
 * utility function to check if a given string, object, array, etc is empty
 * @param value  - item to be checked
 */
export default function isEmpty(value) {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	);
}
