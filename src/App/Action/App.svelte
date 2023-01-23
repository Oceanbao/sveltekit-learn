<script>
	// Action are essentially element-level lifecycle functions
	// Good for:
	// - interfacing with 3rd libs
	// - lazy-loaded images
	// - tooltips
	// - adding custom event handlers
	import { clickOutside } from './click_outside';

	let showModal = true;

	// Taking params (if multiple, needs a object)
	import { longpress } from './longpress';

	let pressed = false;
	let duration = 2000;
</script>

<button on:click={() => (showModal = true)}>Show Modal</button>
{#if showModal}
	<div class="box" use:clickOutside on:outclick={() => (showModal = false)}>Click outside me!</div>
{/if}

<label>
	<input type="range" bind:value={duration} max={2000} step={100} />
	{duration}ms
</label>

{#if pressed}
	<p>
		congratulations, you pressed and held for {duration}ms
	</p>
{/if}

<button
	use:longpress={duration}
	on:longpress={() => (pressed = true)}
	on:mouseenter={() => (pressed = false)}>press and hold</button
>

<style>
	.box {
		--width: 100px;
		--height: 100px;
		position: absolute;
		width: var(--width);
		height: var(--height);
		left: calc(50% - var(--width) / 2);
		top: calc(50% - var(--height) / 2);
		border-radius: 4px;
		background-color: #ff3e00;
		color: #fff;
		text-align: center;
		font-weight: bold;
	}
</style>
