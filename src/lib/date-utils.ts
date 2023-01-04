function isPastDay(date: Date) {
	return date < new Date();
}

function isYesterday(date: Date) {
	return (
		date.toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
	);
}

function isToday(date: Date) {
	return date.toDateString() === new Date().toDateString();
}

function isTomorrow(date: Date) {
	return (
		date.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()
	);
}

function isFutureDay(date: Date) {
	return date > new Date();
}

function daysOut(date: Date) {
	return (isPastDay(date) ? Math.floor : Math.ceil)(
		Math.abs(new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
	);
}

function daysInMonth(month: number) { // 0-indexed month number
	return new Date(new Date().getFullYear(), month + 1, 0).getDate();
}

export { isPastDay, isYesterday, isToday, isTomorrow, isFutureDay, daysOut, daysInMonth };
