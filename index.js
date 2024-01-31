const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let todo = [];

app.get('/todo', (req, res) => {
    res.json({
        result: true,
        message: '',
        data: todo
    });
});

app.post('/todo', (req, res) => {
    const { text } = req.body;
    const id = todo[todo.length - 1]?.id ?? 0;
    const newTodo = {
        id: id + 1,
        text,
    };
    todo.push(newTodo);
    res.json({
        result: true,
        message: '',
        data: newTodo
    });
});

app.post('/todo/update/:id', (req, res) => {
    const { text } = req.body;
    const id = parseInt(req.params.id);
    const index = todo.findIndex(f => f.id == id);
    if (index < 0) {
        return res.status(200).json({ result: false, message: 'id not found' });
    }
    todo[index].text = text;
    res.json({
        result: true,
        message: '',
        data: todo[index]
    });
});

app.post('/todo/deleted/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (todo.filter(f => f.id == id).length == 0) {
        return res.json({
            result: false,
            message: 'id not found',
            data: todo
        });
    }
    todo = todo.filter(todo => todo.id !== id);
    res.json({
        result: true,
        message: 'deleted successfully',
        data: todo
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});