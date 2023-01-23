<script>
	/*
  Just as you can bind to properties of DOM elements, you can bind to component props.
  For example, we can bind to the value prop of this <Keypad> component as though it were a form element:
  
  Now, when the user interacts with the keypad, the value of pin in the parent component is immediately updated.

  NOTE: Use component bindings sparingly. It can be difficult to track the flow of data around your
  application if you have too many of them, especially if there is no 'single source of truth'.
  */
	import Keypad from './Keypad.svelte';

	let pin;
	$: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin';

	function handleSubmit() {
		alert(`submitted ${pin}`);
	}

	/*
  Just as you can bind to DOM elements, you can bind to component instances themselves.
  For example, we can bind the instance of <InputField> to a variable named field in the same way we did when binding DOM Elements

  Now we can programmatically interact with this component using field.

  Note that we can't do {field.focus} since field is undefined when the button is first rendered and throws an error.
  */
	import InputField from './InputField.svelte';

	let field;
</script>

<h1 style="color: {pin ? '#333' : '#ccc'}">
	{view}
</h1>

<Keypad bind:value={pin} on:submit={handleSubmit} />

<InputField bind:this={field} />

<button on:click={() => field.focus()}>Focus field</button>
