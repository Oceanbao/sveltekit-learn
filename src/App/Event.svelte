<script>
	let m = { x: 0, y: 0 };

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	function runOnce() {
		alert('no more alert');
	}

	// Dispatch event from component
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}

	// Event forward (here from Inner message dispatch, passing through EventForward, reaching here and handled)
	import EventForward from './EventForward.svelte';

	function handleMessage(event) {
		alert(event.detail.text);
	}

	// Props generalling drill down, soemtimes useful to ref up, e.g. input tag
	let inputName = 'Ocean';
</script>

<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>

<div
	on:mousemove={(e) => {
		m = { x: e.clientX, y: e.clientY };
	}}
>
	The mouse position is {m.x} x {m.y}
</div>

<button on:click|once={runOnce}>Click me</button>

<button on:click={sayHello}> Click to say hello </button>

<EventForward on:message={handleMessage} />

<input bind:value={inputName} />
<p>Input name: {inputName}</p>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
