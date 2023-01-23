<script>
	// If simply <slot name="footer"></slot> the parent flex layout won't
	// apply on Footer because it's wrapped in div, a flow layout
	import Box from './Box.svelte';
</script>

<Box>
	<svelte:fragment slot="footer">
		<p>All rights reserved.</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Box>
