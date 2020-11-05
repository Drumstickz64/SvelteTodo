<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Todo from "./components/Todo.svelte";
	import { todos } from "./stores.js";
	
	// fetch todos
	async function fetchTodos() {
		const res = await fetch("/api/todo");
		if (!res.ok) {
			throw Error;
		}
		
		const data = await res.json()
		const sortedData = data.sort((a, b) => a.done - b.done)
		todos.set(sortedData)
	}
	
</script>

<Header></Header>

<main>
	{#await fetchTodos()}
		<p>Loading...</p>
	{:then}
	
		{#each $todos as todo (todo._id)}
			<Todo {...todo}></Todo>
		{:else}
			<p>There are no todos, try adding a new one</p>
		{/each}
	
	{:catch}
		<p class="error">OOPS! couldn't connect to the server</p>
	{/await}
</main>

<Footer></Footer>

<style>
	main {
		padding: 1.5em;
		max-width: 600px;
		margin: 0 auto;
	}
	
	.error {
		color: #ff0d0d;
		text-align: center;
	}
	
	main :global(.todo) {
		margin: 0 auto 1rem;
	}
</style>
