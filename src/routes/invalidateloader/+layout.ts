export async function load({ fetch, depends }) {
	const response = await fetch('/invalidateloader/api/now');
	const now = await response.json();

	// This is a custom dependence instead of fetch()
	depends('data:again');

	return {
		now,
		again: Date.now()
	};
}
