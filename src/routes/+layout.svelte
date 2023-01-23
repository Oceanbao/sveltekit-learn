<script>
	import '@app/app.css';
</script>

<header>
	<nav>
		<a href="/" class="text-3xl font-bold underline">home</a>
		<a href="/about" class="text-3xl font-bold underline">about</a>
		<a href="/expected" class="text-3xl font-bold underline">page with expected error</a>
		<a href="/unexpected" class="text-3xl font-bold underline">page with unexpected error</a>
		<a href="/learn" class="text-3xl font-bold underline">learning svelte</a>
		<a href="/spring" class="text-3xl font-bold underline">spring motion</a>
		<a href="/optionalparam" class="text-3xl font-bold underline">optional param</a>
		<a href="/matchparam" class="text-3xl font-bold underline">param matcher</a>
		<a href="/grouproute" class="text-3xl font-bold underline">group route</a>
		<a href="/resetlayout" class="text-3xl font-bold underline">reset layout</a>
		<a href="/advancedloading" class="text-3xl font-bold underline">advanced loading</a>
		<a href="/invalidateloader" class="text-3xl font-bold underline">invalidate loader</a>
	</nav>
</header>

<slot />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.800);
	}
</style>
