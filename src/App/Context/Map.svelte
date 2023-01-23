<script>
	import { onDestroy, setContext } from 'svelte';
	import { key } from './map';

	setContext(key, {
		getMap: () => map
	});

	export let lat;
	export let lon;
	export let zoom;

	let map;

	function load() {
		map = new Map();
		map.set('style', 'mapbox://styles/mapbox/streets-v9');
		map.set('center', [lon, lat]);
		map.set('zoom', zoom);
	}

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<slot />
