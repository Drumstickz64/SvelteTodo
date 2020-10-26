<script>
	import { todos } from "../stores.js";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	
	// addTodo function
	async function addTodo(ev) {
		const form = ev.target;
		
		try {
			
			const res = await fetch("/api/todo", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text: form.text.value })
			});
			
			if (res.ok) {
				const newTodo = await res.json();
				todos.update(currentTodos => [newTodo, ...currentTodos]);
				form.text.value = "";
			} else {
				alert("Couldn't add todo. please try again")
			}
		
		} catch (err) {
			alert("Couldn't add todo. please try again")
		}
		
	}
	
</script>

<header class="header">
	<form on:submit|preventDefault={addTodo} class="search-field">
		<input type="text" required name="text" placeholder="Enter todo here:" class="input" />
		<button class="btn">Add</button>
	</form>
</header>

<style>
	.header {
		width: 100%;
		height: 20vh;
		min-height: 50px;
		max-height: 100px;
		margin-bottom: 1.5em;
		background: white;
		-webkit-box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);
		-moz-box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);
		box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	
	.input {
		min-height: 100%;
		margin: 0 .5em 0 0;
		padding: 1em 1em;
		outline: none;
	}
	
	.input:hover,
	.input:focus {
		outline: 2px solid dodgerBlue;
	}
	
	.btn {
		display: inline-block;
		padding: 1em 2em;
		min-height: 100%;
		background: dodgerBlue;
		color: white;
		border: none;
		outline: none;
		font-weight: 600;
		margin: 0;
		cursor: pointer;
		-webkit-border-radius: .2em;
		-moz-border-radius: .2em;
		border-radius: .5em;
	}
	
	.btn:not(:disabled):active::before {
		content: "";
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.75);
		border-radius: .5em;
	}
	
	.btn:focus {
		-webkit-box-shadow: 0 0 1px #43a2ff;
		-moz-box-shadow: 0 0 1px #43a2ff;
		box-shadow: 0 0 3px #43a2ff;
	}
</style>