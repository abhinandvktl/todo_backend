const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  todos = todos.map(todo =>
    todo.id === parseInt(id) ? { ...todo, completed } : todo
  );
  res.json(todos.find(todo => todo.id === parseInt(id)));
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
