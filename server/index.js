const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

// ROUTES //
// Add todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.send(newTodo.rows[0])
  } catch (err) {
    console.error(err.message);
  }
});
// GET ALL TODOS
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})
// Get one todo
app.get('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params

        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
        res.send(todo.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})
// Update todo
app.put('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const {description } = req.body;
        const updatedTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id])
        res.json("Todo was updated")
    } catch (err) {
        console.error(err.message)
    }
})
// DELETE todo
app.delete('/todos/:id', async(req, res)=> {
    try {
        const { id } = req.params
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Todo was deleted")
    } catch (err) {
        console.error(err.message)
    }
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
