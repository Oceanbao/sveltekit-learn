<script>
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	// import { invalidateAll } from 'app/navigation';
	// This is nuclear option that re-run all loaders
	// Example here would be to update +layout.ts to directly return
	// Date.now() (without depends) and call invalidateAll as interval here
	// onMount

	export let data;

	onMount(() => {
		const intervalFetch = setInterval(() => {
			invalidate('/invalidateloader/api/now');
		}, 1000);

		const intervalDepend = setInterval(() => {
			invalidate('data:again');
		}, 1000);

		return () => {
			clearInterval(intervalFetch);
			clearInterval(intervalDepend);
		};
	});

	console.log(data);
</script>

<h1>
	{new Intl.DateTimeFormat([], {
		timeStyle: 'full',
		timeZone: data.timezone
	}).format(new Date(data.now))}
	<hr />
	{new Intl.DateTimeFormat([], {
		timeStyle: 'full',
		timeZone: data.timezone
	}).format(new Date(data.again))}
</h1>

