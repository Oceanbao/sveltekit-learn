<script>
	// numeric and string
	let a = 1;
	let b = 2;

	// checkbox
	let yes = false;

	// group inputs
	let scoops = 1;
	let flavours = ['Mint choc chip'];

	let menu = ['Cookies and cream', 'Mint choc chip', 'Raspberry ripple'];

	function join(flavours) {
		if (flavours.length === 1) return flavours[0];
		return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
	}

	// textarea
	// import { marked } from 'marked';
	let value = `Some words are *italic*, some are **bold**`;

	// select
	let questions = [
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	];

	let selected;

	let answer = '';

	function handleSubmit() {
		alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
	}
</script>

<label>
	<input type="number" bind:value={a} min="0" max="10" />

	<input type="range" bind:value={a} min="0" max="10" />
</label>
<label>
	<input type="number" bind:value={b} min="0" max="10" />

	<input type="range" bind:value={b} min="0" max="10" />
</label>
<p>{a} + {b} = {a + b}</p>

<label>
	<input type="checkbox" bind:checked={yes} />
	Yes! Send me regular email spam
</label>

{#if yes}
	<p>Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
	<p>You must opt in to continue. If you're not paying, you're the product.</p>
{/if}
<button disabled={!yes}> Subscribe </button>

<h2>Size</h2>

<label>
	<input type="radio" bind:group={scoops} name="scoops" value={1} />
	One scoop
</label>

<label>
	<input type="radio" bind:group={scoops} name="scoops" value={2} />
	Two scoops
</label>

<label>
	<input type="radio" bind:group={scoops} name="scoops" value={3} />
	Three scoops
</label>

<h2>Flavours</h2>
{#each menu as flavour}
	<label>
		<input type="checkbox" bind:group={flavours} name="flavours" value={flavour} />
		{flavour}
	</label>
{/each}
{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops}
		{scoops === 1 ? 'scoop' : 'scoops'}
		of {join(flavours)}
	</p>
{/if}

<!-- {@html marked(value)} -->
<textarea bind:value />

<h2>Insecurity questions</h2>
<form on:submit|preventDefault={handleSubmit}>
	<select bind:value={selected} on:change={() => (answer = '')}>
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>
	<input bind:value={answer} />
	<button disabled={!answer} type="submit"> Submit </button>
</form>
<p>
	selected question {selected ? selected.id : '[waiting...]'}
</p>

<style>
	label {
		display: flex;
	}

	input {
		display: block;
		width: 500px;
		max-width: 100%;
	}

	input,
	p {
		margin: 6px;
	}

	textarea {
		width: 100%;
		height: 200px;
	}
</style>
