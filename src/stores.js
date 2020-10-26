import { writable } from "svelte/store";

const todos = writable([])

export {
	todos
}