<script>
	import { fade } from 'svelte/transition';
	import { fly } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	let visible = true;

	// returns options: delay, duration, easing, css, tick
	// mostly using css and NOT tick to run in on main thread
	function spin(node, { duration }) {
		return {
			duration,
			css: (t) => {
				const eased = elasticOut(t);

				return `
          transform: scale(${eased}) rotate(${eased + 1000}deg);
          color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
        );`;
			}
		};
	}

	// JS animation
	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

	// Transition events
	let status = 'waiting...';

	// Local transition (target only)
	let showItems = true;
	let i = 5;
	let items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

	// Key Block
	import { onMount } from 'svelte';
	import { messages, typewriterKey } from './typewriter-transition';

	let x = -1;

	onMount(() => {
		console.log('onMount');
		const interval = setInterval(() => {
			console.log('interval: ', x);
			x += 1;
			x %= messages.length;
		}, 2500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<p transition:fade>Fades in and out</p>
{/if}

{#if visible}
	<p transition:fly={{ y: 200, duration: 2000 }}>Flies in and out</p>
{/if}

{#if visible}
	<p in:fly={{ y: 200, duration: 2000 }} out:fade>Flies in, fades out</p>
{/if}

{#if visible}
	<div class="centered" in:spin={{ duration: 8000 }} out:fade>
		<span>transitions!</span>
	</div>
{/if}

{#if visible}
	<p transition:typewriter>The quick brown fox jumps over the lazy dog</p>
{/if}

<p>status: {status}</p>
{#if visible}
	<p
		transition:fly={{ y: 200, duration: 2000 }}
		on:introstart={() => (status = 'intro started')}
		on:outrostart={() => (status = 'outro started')}
		on:introend={() => (status = 'intro ended')}
		on:outroend={() => (status = 'outro ended')}
	>
		Flies in and out
	</p>
{/if}

<label>
	<input type="checkbox" bind:checked={showItems} />
	show list
</label>

<label>
	<input type="range" bind:value={i} max="10" />
</label>

{#if showItems}
	{#each items.slice(0, i) as item}
		<div transition:slide|local>
			{item}
		</div>
	{/each}
{/if}

{#key x}
	<p in:typewriterKey={{ speed: 10 }}>
		{messages[x] || ''}
	</p>
{/key}

<style>
	.centered {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	span {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: 4em;
	}

	div {
		padding: 0.5em 0;
		border-top: 1px solid #eee;
	}
</style>
