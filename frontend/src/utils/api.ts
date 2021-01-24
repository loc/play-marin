export async function fetchApi(path: string) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`);
	return await response.json();
}
