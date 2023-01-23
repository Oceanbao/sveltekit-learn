<script>
	// store.js
	import { writable } from 'svelte/store';

	// Binding to store value to abstract boilterplate of auto-subscription
	// $ is reserved keyword inside DOM to signal store value
	export const count = writable(0);

	// Decrementer.svelte
	function decrement() {
		count.update((n) => n - 1);
	}

	// Incrementer.svelte
	function increment() {
		count.update((n) => n + 1);
	}

	// Resetter.svelte
	function reset() {
		count.set(0);
	}

	let count_value;

	count.subscribe((value) => {
		count_value = value;
	});

	// Readable store
	import { readable } from 'svelte/store';

	export const time = readable(new Date(), function start(set) {
		const interval = setInterval(() => {
			set(new Date());
		}, 1000);

		return function stop() {
			clearInterval(interval);
		};
	});

	const formatter = new Intl.DateTimeFormat('en', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	});

	// Derived stores
	import { derived } from 'svelte/store';

	const start = new Date();

	const elapsed = derived(time, ($time) => Math.round(($time - start) / 1000));

	// Custom store
	function createCount() {
		const { subscribe, set, update } = writable(0);

		return {
			subscribe,
			increment: () => update((n) => n + 1),
			decrement: () => update((n) => n - 1),
			reset: () => set(0)
		};
	}

	const customCount = createCount();
	// export const count = createCount();

	// Bind to writable store
	const name = writable('world');
	const greeting = derived(name, ($name) => `Hello ${$name}!`);
</script>

<h1>The count is {count_value}</h1>

<h1>This is a binding to store value {$count}</h1>

<h1>The time is {formatter.format($time)}</h1>

<p>
	This page has been open for
	{$elapsed}
	{$elapsed === 1 ? 'second' : 'seconds'}
</p>

<button on:click={increment}> + </button>
<button on:click={decrement}> - </button>
<button on:click={reset}> reset </button>

<h1>The count is {$count}</h1>
<button on:click={customCount.increment}>+</button>
<button on:click={customCount.decrement}>-</button>
<button on:click={customCount.reset}>reset</button>

<h1>{$greeting}</h1>
<input bind:value={$name} />
<button on:click={() => ($name += '!')}> Add exclamation mark! </button>
