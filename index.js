const express = require("express");
const morgan = require("morgan");
const Datastore = require("nedb");

const PORT = process.env.PORT || 5000;
const app = express();
const logStyle = process.env.ROLLUP_WATCH? "dev" : "tiny";
const logger = morgan(logStyle);

app.listen(PORT, "127.0.0.1", () => console.log("Listening on port: " + PORT));

/* middleware */
app.use(logger);

// serves the static files produced by svelte
app.use(express.static("public"));
app.use(express.json({ extended: true }));

/* servwr code */
const Todo = new Datastore({ filename: "todos.db", timestampData: true });
Todo.loadDatabase(err => {
	
	if (err) {
		console.error(err);
	} else {
		console.log("Connected to Todos");
	}
	
});

// routes
app.get("/api/todo", (req, res) => {
	
	Todo.find({}, (err, todos) => {
		if (err) { res.status(500).send() }
		
		res.json(todos);
	});
	
});

app.post("/api/todo", (req, res) => {
	const todo = { text: req.body.text, done: false };
	
	Todo.insert(todo, (err, newTodo) => {
		
		if (err) { res.status(500).send() }
		
		res.status(201).json(newTodo);
		
	});
	
});

app.put("/api/todo/:id", (req, res) => {
	
	Todo.update({ _id: req.params.id }, req.body, err => {
		if (err) { res.status(500).send() }
		res.status(200).send();
		
	});
	
});

app.delete("/api/todo/:id", (req, res) => {
	Todo.remove({ _id: req.params.id }, err => {
		
		if (err) { res.status(500).send() }
		
		res.status(200).send();
		
	});
});

// 404 handler
app.use((req, res) => {
	res.status(404).send();
});