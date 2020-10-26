<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Todo from "./components/Todo.svelte";
	import { todos } from "./stores.js";
	
	// fetch todos
	let loading = true;
	let ok = true;
	fetch("/api/todo")
	    .then(res => {
			if (!res.ok) { throw new Error(); }
			
			return res.json();
		})
		.then(json => {
			// places unfinished todos over finished ones
			json = json.sort((a, b) => a.done - b.done)
			todos.set(json);
			loading = false;
		})
		.catch(() => ok = false);
	
</script>

<Header></Header>

<main>
	{#if loading}
		<p>Loading...</p>
	{:else if ok}
	
		{#each $todos as todo (todo._id)}
			<Todo {...todo}></Todo>
		{:else}
			<p>There are no todos, try adding a new one</p>
		{/each}
	
	{:else}
		<p>Couldn't connect to server. Please retry.</p>
	{/if}
</main>

<Footer></Footer>

<style>
	main {
		padding: 1.5em;
		max-width: 600px;
		margin: 0 auto;
	}
	
	main :global(.todo) {
		margin: 0 auto 1rem;
	}
</style>