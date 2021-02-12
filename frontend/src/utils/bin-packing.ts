// Takes calendar entries for the homepage program calendar graphic and converts
// them to solve an implementation of First Fit Decreasing bin packing algorithm.

export type Bar = {
	start: number;
	length: number;
	isSplitLeftSide?: true;
	isSplitRightSide?: true;
};

const NORMALIZED_MAX = 1;

function numFallsInBar(x: number, { start, length }: Readonly<Bar>) {
	const wrappedEnd = (start + length) % NORMALIZED_MAX;
	if (wrappedEnd < start)
		return !numFallsInBar(x, { start: wrappedEnd, length: start - wrappedEnd });
	return x >= start && x <= start + length;
}

function doBarsOverlap(a: Readonly<Bar>, b: Readonly<Bar>) {
	return (
		numFallsInBar(b.start, a) ||
		numFallsInBar(b.start + b.length, a) ||
		numFallsInBar(a.start, b)
	);
}

function binHasSpaceForBar(bin: Readonly<Bar>[], bar: Readonly<Bar>) {
	return bin.every((binnedBar) => {
		return !doBarsOverlap(binnedBar, bar);
	});
}

export function packBarsInBins<T extends Bar>(
	bars: Readonly<T>[]
): Readonly<T>[][] {
	const sorted = [...bars].sort((a, b) => b.length - a.length);
	const bins = [];

	for (let i = 0; i < sorted.length; i++) {
		const bar = sorted[i];
		const bin = bins.find((bin) => {
			return binHasSpaceForBar(bin, bar);
		});

		if (bin) {
			bin.push(bar);
		} else {
			bins.push([]);
			bins[bins.length - 1].push(bar);
		}
	}

	return bins;
}
