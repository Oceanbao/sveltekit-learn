// This shows a client loader can get load() return from both
// parent client loader and parent server loader (NOTE server loader can only
// get return from parent server loader)
export async function load({ parent }) {
  // parent() block on loaders in parent; hence avoid waterfall unless needed
	const { a, b } = await parent();
	return { c: a + b };
}

