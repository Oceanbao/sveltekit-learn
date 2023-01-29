export function load({ params }) {
	console.log(params);
	return {
		timezone: params.timezone
	};
}
