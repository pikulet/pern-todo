const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// router

// create todo
app.post("/todos", async (req, res) => {
    try {
        console.log("INFO: creating todo...");
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo(description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all todos

app.get("/todos", async (req, res) => {
    try {
        console.log("INFO: retrieving all todos...");
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get todo

app.get("/todos/:id", async (req, res) => {
    try {
        console.log("INFO: getting a todo...");
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE t_id = $1",
            [id]
        );
        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// update todo

app.put("/todos/:id", async (req, res) => {
    try {
        console.log("INFO: updating a todo...");
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE t_id = $2",
            [description, id]
        );
        res.json("Updated todo");
    } catch (err) {
        console.error(err.message);
    }
});

// delete todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE t_id = $1",
            [id]
        );

        res.json("Todo deleted");
    } catch (err) {
        console.log(err.message);
    }
});
app.listen(5000, (req, res) => {
    console.log("INFO: server is running...");
});
