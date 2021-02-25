import homepage from '../styles/homepage.module.scss';
import programCalendar from '../styles/program-calendar.module.scss';
import { fromDateStringToNormalizedPercentOfYear } from '../utils/api';
import { Bar, packBarsInBins } from '../utils/bin-packing';
import { rotate } from '../utils/utils';

const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export function HomepageProgramCalendar({
	bars,
	description,
}: {
	bars: NamedBar[];
	description: string;
}) {
	const numOfMonthsToShift = 7;
	const bins = prepBinsForCalendarDisplay(
		packBarsInBins(bars),
		numOfMonthsToShift
	);

	return (
		<>
			<div className={homepage['program-calendar-description']}>
				{description}
			</div>
			<div className={programCalendar.container}>
				<div className={programCalendar.months}>
					{rotate(MONTHS, numOfMonthsToShift).map((month) => (
						<div key={month}>{month}</div>
					))}
				</div>
				<div>
					{bins.map((bin, index) => (
						<div key={index} className={programCalendar.bin}>
							{bin.map((bar, index) => (
								<div
									className={[
										programCalendar.bar,
										...(bar.isSplitLeftSide
											? [programCalendar['split-left']]
											: []),
										...(bar.isSplitRightSide
											? [programCalendar['split-right']]
											: []),
									].join(' ')}
									style={{
										left: `${bar.start * 100}%`,
										width: `${bar.length * 100}%`,
									}}
									key={index}
								>
									{bar.name}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</>
	);
}

function shiftBar(bar: NamedBar, calendarStartDay) {
	return { ...bar, start: (bar.start + (1 - calendarStartDay)) % 1 };
}

export interface NamedBar extends Bar {
	name: string;
}

// Account for the bars wrapping around the calendar, for example, when a
// program stretches from December to January.
function prepBinsForCalendarDisplay(
	bins: NamedBar[][],
	numOfMonthsToShift: number
) {
	const monthString = String(numOfMonthsToShift + 1).padStart(2, '0');
	const calendarStartDay = fromDateStringToNormalizedPercentOfYear(
		`2021-${monthString}-01`
	);

	return bins.map((bin) => {
		return bin.reduce((arr, bar) => {
			const shiftedBar = shiftBar(bar, calendarStartDay);
			if (shiftedBar.start + shiftedBar.length > 1) {
				const rightSideLength = 1 - shiftedBar.start;
				const leftSideLength = shiftedBar.start + shiftedBar.length - 1;
				arr.push({
					name: leftSideLength > rightSideLength ? '' : shiftedBar.name,
					start: shiftedBar.start,
					length: rightSideLength,
					isSplitRightSide: true,
				});
				arr.push({
					name: leftSideLength > rightSideLength ? shiftedBar.name : '',
					start: 0,
					length: leftSideLength,
					isSplitLeftSide: true,
				});
			} else {
				arr.push(shiftedBar);
			}
			return arr;
		}, [] as NamedBar[]);
	});
}
