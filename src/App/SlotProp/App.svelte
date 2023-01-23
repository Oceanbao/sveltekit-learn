<script>
	// <Hoverable> tracks mouseover, it needs to pass that data BACK to parent,
	// so that we can update the slotted contents
	// `let` directive exposes `hovering` to the contents of <Hoverable>
	// Here renamed to `active`
	// Can have as many such components and slotted props will remain local where declared
	// Named slots can also have props; `let` with `slot="..."` instead of component itself
	import Hoverable from './Hoverable.svelte';
</script>

<Hoverable let:hovering={active}>
	<div class:active>
		{#if active}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>

<Hoverable let:hovering={active}>
	<div class:active>
		{#if active}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>

<Hoverable let:hovering={active}>
	<div class:active>
		{#if active}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>

<style>
	div {
		padding: 1em;
		margin: 0 0 1em 0;
		border: 1px solid #ff3e00;
	}

	.active {
		background-color: #ff3e00;
		color: white;
	}
</style>
