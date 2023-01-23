<script>
	import { getContext } from 'svelte';
	import { key } from './map';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lat;
	export let lon;
	export let label;
</script>

<p>lat: {lat}, lon: {lon}, label: {label} - context: {JSON.stringify(map)}</p>
