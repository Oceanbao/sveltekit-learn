<script>
	/*
  Elements are measured using a technique similar to this one. 
  There is some overhead involved, so it's not recommended to use this for large numbers of elements.

  display: inline elements cannot be measured with this approach; 
  nor can elements that can't contain other elements (such as <canvas>).
  In these cases you will need to measure a wrapper element instead.
  */
	let w;
	let h;
	let size = 42;
	let text = 'edit me';
</script>

<input type="range" bind:value={size} />
<input bind:value={text} />

<p>size: {w}px x {h}px</p>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px">{text}</span>
</div>

<style>
	input {
		display: block;
	}
	div {
		display: inline-block;
	}
	span {
		word-break: break-all;
	}
</style>
