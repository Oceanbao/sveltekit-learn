<script>
	import Nested from './Nested.svelte';
	import PackageInfo from './PackageInfo.svelte';

	let src = '/image.gif';
	let name = 'Svelte';
	// HTML literal
	let htmlString = `this contains some <strong>HTML!!!</strong>`;

	let count = 0;
	// reactive value
	$: doubled = count * 2;

	// reactive statement
	$: if (count >= 10) {
		alert('count is dangerously high!');
		count = 0;
	}

	function increment() {
		count += 1;
	}

	// update array and object
	let numbers = [1, 2, 3, 4];

	// KEY: reactivity is triggered by direct assignement of the target
	// push, pop won't work
	function addNumber() {
		numbers = [...numbers, numbers.length + 1];
		// numbers[numbers.length] = numbers.length + 1
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);

	// spread props
	const pkg = {
		name: 'svelte',
		version: '3',
		speed: 'blazing',
		website: 'https://svelte.dev'
	};

	// logic
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}

	// each bloc
	let cats = [
		{
			id: 'J---aiyznGQ',
			name: 'Keyboard Cat'
		},
		{
			id: 'z_AbfPXTKms',
			name: 'Maru'
		},
		{
			id: 'OUtn3pvWmpg',
			name: 'Henri The Existential Cat'
		}
	];

	// keyed each blocks to avoid bug
	import Thing from './Thing.svelte';

	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	];

	function handleClick() {
		things = things.slice(1);
	}
</script>

<h1>Hello {name.toUpperCase()}!</h1>
<p>This is a paragrah</p>
<Nested answer={42} />

<img {src} alt="{name} dances." />

<p>{@html htmlString}</p>

<button on:click={increment}>Clicked {count} {count === 1 ? 'time' : 'times'}</button>
<p>{count} doubled is {doubled}</p>

<p>{numbers.join(' + ')} = {sum}</p>
<button on:click={addNumber}>Add a number</button>

<PackageInfo {...pkg} />

{#if user.loggedIn}
	<button on:click={toggle}>Log out</button>
{:else if count > 10}
	<p>Count is > 10</p>
{:else}
	<button on:click={toggle}>Log in</button>
{/if}

<h1>The Famous Cats of YouTube</h1>

<ul>
	{#each cats as { id, name }, i}
		<li>
			<a target="_blank" href="https://www.youtube.com/watch?v={id}" rel="noreferrer">
				{i + 1}: {name}
			</a>
		</li>
	{/each}
</ul>

<button on:click={handleClick}> Remove first thing </button>
{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}

<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>
