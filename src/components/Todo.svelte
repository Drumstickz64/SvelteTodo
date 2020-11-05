<script>
	import { fade } from "svelte/transition";
	import { todos } from "../stores.js";

	export let _id, text, done, createdAt, updatedAt;
	
	let inEditMode = false;
	let editText = text;

	async function toggleDone() {
		// prevents accidental toggle when in edit mode
		if (inEditMode) { return }

		const newTodo = {
			_id,
			createdAt,
			updatedAt,
			text,
			done: !done
		};

		try {

			const res = await fetch("/api/todo/" + _id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newTodo)
			});

			if (res.ok) {
				todos.update(currentTodos => {
					// replace the old todo with a new one
					let newTodos = currentTodos.map(todo => (todo._id === _id)? newTodo : todo);
					// sorts todos by placing unfinished todos over finished ones
					return newTodos.sort((a, b) => a.done - b.done)
				});
			} else {
				alert("Couldn't toggle todo completion. please try again.");
			}

		} catch (err) {
			alert("Couldn't toggle todo completion. please try again.");
		}

	}

	async function deleteSelf() {

		try {
			const res = await fetch("/api/todo/" + _id, {
				method: "DELETE"
			});

			if (res.ok) {

				todos.update(currentTodos => currentTodos.filter(todo => todo._id !== _id));

			} else {
				alert("Couldn't toggle todo completion. please try again");
			}

		} catch (err) {
			alert("Couldn't delete todo. please try again");
		}

	}

	function toggleEditMode() {
		if (inEditMode) {
			editText = text
		}

		inEditMode = !inEditMode;
	}

	async function editSelf() {
		const newTodo = {
			_id,
			done,
			createdAt,
			updatedAt,
			text: editText
		};

		try {

			const res = await fetch("/api/todo/" + _id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newTodo)
			});

			if (res.ok) {
				todos.update(currentTodos => currentTodos.map(todo => (todo._id === _id)? newTodo: todo));
				toggleEditMode()
			} else {
				alert("Couldn't edit todo. Please try again.");
			}

		} catch (err) {
			alert("Couldn't edit todo. Please try again.");
		}

	}
</script>

<div transition:fade={{ duration: 100 }} class:todo--done={done} on:click={toggleDone} class="todo">
	{#if inEditMode}
	<input class="todo__input" bind:value={editText} />
	{:else}
	<p class="todo__text">
		{ text }
	</p>
	{/if}
	<div class="todo__btns">

		<!-- cancels edit when in edit mode, enters it when not -->
		{#if inEditMode}
		<button class="todo__edit-cancel">
			<img src="/img/cross.svg" alt="cancel edit" on:click|stopPropagation={toggleEditMode}>
		</button>
		{:else}
		<button class="todo__edit-enable" on:click|stopPropagation={toggleEditMode}>
			<img src="/img/pen.svg" alt="edit">
		</button>
		{/if}

		<!-- saves edit when in edit mode, deletes todo when not -->
		{#if inEditMode}
		<button class="todo__edit-save" on:click|stopPropagation={editSelf}>
			<img src="/img/disk.svg" alt="save changes">
		</button>
		{:else}
		<button class="todo__delete" on:click|stopPropagation={deleteSelf}>
			<img src="/img/trash.svg" alt="delete">
		</button>
		{/if}

	</div>
</div>

<style>
	.todo {
		font-family: "Fira Sans", Sans-Serif;
		background: white;
		color: black;
		padding: .75em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		-moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

		-webkit-border-radius: 12px;
		-moz-border-radius: 12px;
		border-radius: 12px;
	}

	.todo {
		border-bottom: 2px solid dodgerblue;
		-webkit-transition: transform 50ms ease;
		-moz-transition: transform 50ms ease;
		-ms-transition: transform 50ms ease;
		-o-transition: transform 50ms ease;
		transition: transform 50ms ease;
	}

	.todo:hover,
	.todo:focus {
		-webkit-transform: scale(1.05);
		-moz-transform: scale(1.05);
		-ms-transform: scale(1.05);
		-o-transform: scale(1.05);
		transform: scale(1.05);
	}

	.todo--done {
		border-color: #bae75e;
	}

	.todo--done .todo__text {
		text-decoration: line-through;
		font-style: italic;
		color: #999;
		font-weight: 200;
	}

	.todo__text, .todo__input {
		font-size: 1.5rem;
		width: 80%;
		margin: .5em 0;
	}

	.todo__input {
		padding: 0.5em;
		outline: 1px solid black;
	}

	button {
		background: none;
		border: none;
		outline: none;
	}

	button:hover,
	button:focus {
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
		-webkit-box-shadow: 0 0 2px rgba(0, 0, 0, .15);
		-moz-box-shadow: 0 0 2px rgba(0, 0, 0, .15);
		box-shadow: 0 0 5px rgba(0, 0, 0, .15);
	}

	img {
		width: 18px;
	}
</style>