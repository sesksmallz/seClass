export default function parseServerErrors(error) {
	let errorMessage = '';
	if (typeof error.response?.data?.errors === 'object') {
		Object.values(error.response?.data?.errors).forEach((item) => {
			if (Array.isArray(item)) {
				item.forEach((err) => {
					errorMessage += `${err} \n`;
				});
			} else {
				errorMessage += `${item}\n`;
			}
		});
	} else {
		errorMessage = error.response?.data?.message;
	}

	return errorMessage;
}
