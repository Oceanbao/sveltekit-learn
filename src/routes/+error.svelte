<script>
	import { page } from '$app/stores';

	const emojis = {
		// TODO add the rest!
		420: '🫠',
		500: '💥'
	};
</script>

<!-- This is layout-level error page -->
<h1>{$page.status} {$page.error.message}</h1>
<span style="font-size: 10em">
	{emojis[$page.status] ?? emojis[500]}
</span>
