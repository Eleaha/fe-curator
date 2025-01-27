export const formatDisplayDate = (dateString: string) => {
	const date: Date = new Date(dateString);

	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const formatDate = (dateString: string) => {
	return dateString.slice(0, 10);
};

export const checkLiveStatus = (
	fromDateString: string,
	toDateString: string
) => {
	const today = new Date();
	const fromDate: Date = new Date(fromDateString);
	const toDate: Date = new Date(toDateString);
	if (today >= fromDate && today <= toDate) {
		return "Exhibiting";
	} else if (today > toDate) {
		return "Exhibition was";
	} else {
		return "Scheduled";
	}
};
