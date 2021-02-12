export async function fetchApi(path: string) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`);
	return await response.json();
}

function getNormalizedWrappedLength(start: number, end: number) {
	if (end < start) return 1 - start + end;
	return end - start;
}

const NUM_DAYS = 365;
const ONE_DAY_MS = 1000 * 60 * 60 * 24;
export function fromDateStringToNormalizedPercentOfYear(dateString: string) {
	const day = new Date(dateString);
	const firstOfTheYear = new Date(day.getFullYear(), 0, 0);
	return (
		Math.floor((day.getTime() - firstOfTheYear.getTime()) / ONE_DAY_MS) /
		NUM_DAYS
	);
}

export function takeDatePairAndMakeCalendarBar([start, end]: [string, string]) {
	const startDayOfTheYear = fromDateStringToNormalizedPercentOfYear(start);
	const endDayOfTheYear = fromDateStringToNormalizedPercentOfYear(end);
	return {
		start: startDayOfTheYear,
		length: getNormalizedWrappedLength(startDayOfTheYear, endDayOfTheYear),
	};
}
