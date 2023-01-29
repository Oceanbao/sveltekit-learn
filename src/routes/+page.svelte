<script lang="ts">
	import type { PageData } from './$types';

	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	import Tweens from '@app/App/Tweens.svelte';
	import Transition from '@app/App/Transition.svelte';

	import DeferredTransition from '@app/App/DeferredTransition/App.svelte';
	import Action from '@app/App/Action/App.svelte';
	import MediaBinding from '@app/App/MediaBinding.svelte';
	import DimensionBinding from '@app/App/DimensionBinding.svelte';
	import ThisBinding from '@app/App/ThisBinding.svelte';
	import ComponentBinding from '@app/App/ComponentBinding.svelte';
	import Slot from '@app/App/Slot.svelte';
	import NamedSlot from '@app/App/NamedSlot.svelte';
	import CheckSlot from '@app/App/CheckSlot/App.svelte';
	import ContextMap from '@app/App/Context/App.svelte';
	import ElementSelf from '@app/App/ElementSelf/App.svelte';
	import CategoryComponent from '@app/App/CategoryComponent/App.svelte';
	import ElementWindow from '@app/App/ElementWindow.svelte';
	import ComponentOptions from '@app/App/ComponentOptions/App.svelte';
	import ModuleScript from '@app/App/ModuleScript/App.svelte';

	// enhance will change reload page to
	// - update form prop
	// - invalidate all data on successful response, causing 'load' functions to rerun
	// - navigate to new page on a redirect response
	// - render the nearest error page if err

	export let data: PageData;
	export let form;

	let creating = false;
	let deleting = [];

	// API routes
	let number;

	async function roll() {
		const response = await fetch('/roll');
		number = await response.json();
	}

	// ContentEditable binding
	let htmlEditedable = `<p>Write some text</p>`;

	let current = 'foo';
	let big = false;
</script>

<h1>home</h1>
<p>this is the home page.</p>

<h1>todos</h1>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<form
	method="POST"
	action="?/create"
	use:enhance={() => {
		creating = true;

		return async ({ update }) => {
			await update();
			creating = false;
		};
	}}
>
	<label>
		{creating ? 'saving...' : 'add a todo:'}
		<input disabled={creating} name="description" value={form?.description ?? ''} required />
	</label>
</form>

<!-- Named actions ? is to omit same page pathname -->
<ul>
	{#each data.todos.filter((todo) => !deleting.includes(todo.id)) as todo (todo.id)}
		<li class="todo" in:fly={{ y: 20 }} out:slide>
			<form
				method="POST"
				action="?/delete"
				use:enhance={() => {
					// NOTE: onSubmit immediately update `deleting` and trigger this block
					// to update with new todos (filtered)
					deleting = [...deleting, todo.id];
					return async ({ update }) => {
						await update();
						deleting = deleting.filter((id) => id !== todo.id);
					};
				}}
			>
				<input type="hidden" name="id" value={todo.id} />
				<button aria-label="Mark as complete">✔</button>

				{todo.description}
			</form>
		</li>
	{/each}
</ul>

<button on:click={roll}>Roll the dice</button>
{#if number != undefined}
	<p>You rolled a {number}</p>
{/if}

<Tweens />

<Transition />

<DeferredTransition />

<Action />

<!-- This is a devtool debug hook (comma-separated variables to watch) -->
{@debug htmlEditedable}

<div contenteditable="true" bind:innerHTML={htmlEditedable} />
<pre>{htmlEditedable}</pre>

<MediaBinding />

<DimensionBinding />

<ThisBinding />

<ComponentBinding />

<!-- Class directive shorthand -->
<button class:selected={current === 'foo'} on:click={() => (current = 'foo')}>foo</button>
<button class:selected={current === 'bar'} on:click={() => (current = 'bar')}>bar</button>
<button class:selected={current === 'baz'} on:click={() => (current = 'baz')}>baz</button>
<label>
	<input type="checkbox" bind:checked={big} />
	big
</label>
<div class:big>
	some {big ? 'big' : 'small'} text
</div>

<Slot
	><h2>Hello</h2>
	<p>This is a box slot. It can contain anything.</p></Slot
>
<Slot />

<NamedSlot>
	<span slot="name"> P. Sherman </span>

	<span slot="address">
		42 Wallaby Way<br />
		Sydney
	</span>
</NamedSlot>

<CheckSlot />

<ContextMap />

<ElementSelf />

<CategoryComponent />

<ElementWindow />

<svelte:head>
	<title>This is a svelt learn</title>
</svelte:head>

<ComponentOptions />

<ModuleScript />

<!-- ENV private static '.env' -->
<form method="POST" action="?/env">
	<label>
		enter the passphrase
		<input name="passphrase" />
	</label>
</form>

{#if form?.incorrect}
	<p class="error">wrong passphrase!</p>
{/if}

<style>
	.error {
		color: red;
	}

	[contenteditable] {
		padding: 0.5em;
		border: 1px solid #eee;
		border-radius: 4px;
	}

	button {
		display: block;
	}

	.selected {
		background-color: #ff3e00;
		color: white;
	}

	.big {
		font-size: 4em;
	}
</style>
