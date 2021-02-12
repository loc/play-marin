[0, 1, 2, 3];
export function rotate<T extends any[]>(arr: T, shift: number): T {
	return [...arr.slice(shift), ...arr.slice(0, shift)] as T;
}
