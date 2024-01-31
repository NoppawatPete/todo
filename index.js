const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let todos = [];

app.get('/todos', (req, res) => {
    res.json({
        result: true,
        message: '',
        data: todos
    });
});

app.post('/todos', (req, res) => {
    const { text } = req.body;
    const id = todos[todos.length - 1]?.id ?? 0;
    const newTodo = {
        id: id + 1,
        text,
    };
    todos.push(newTodo);
    res.json({
        result: true,
        message: '',
        data: newTodo
    });
});

app.post('/todos/update/:id', (req, res) => {
    const { text } = req.body;
    const id = parseInt(req.params.id);
    const index = todos.findIndex(f => f.id == id);
    console.log(index)
    if (index < 0) {
        res.status(200).json({ result: false, message: 'id not found' });
    }

    todos[index].text = text;
    res.json({
        result: true,
        message: '',
        data: todos[index]
    });
});

app.post('/todos/deleted/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (todos.filter(f => f.id == id).length == 0) {
        res.json({
            result: false,
            message: 'id not found',
            data: todos
        });
    }
    todos = todos.filter(todo => todo.id !== id);
    res.json({
        result: true,
        message: 'deleted successfully',
        data: todos
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});