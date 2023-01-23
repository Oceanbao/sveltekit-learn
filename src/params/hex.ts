// This specific file syntax create param matcher
export function match(value) {
	return /^[0-9a-f]{6}$/.test(value);
}

