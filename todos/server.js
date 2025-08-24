const express = require('express');

const app = express();

//middleware to parse JSON
app.use(express.json());

//In memory array to store todos
let todos = [];
let idCounter = 1;

//all get requests
app.get('/todos', (req, res) => {
    res.json(todos);
});

//get a single todo by id
app.get('/todos/:id', (req, res) => {
    const todo = todo.find(t=> t.id == parseInt(req.params.id));
    if(!todo) return res.status(404).json({message: 'Todo not found'});
    res.json(todo);
})

//POST a new todo request

app.post('/todos', (req,res) =>{
    const{task} = req.body;
    if(!task) return res.status(400).json({message: 'Task is required'});

    const newTodo = { id: idCounter++, task, completed: false};
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

//put request to update a todo
app.put('/todos/:id', (req, res) =>{
    const todo = todos.find(t=>t.id === parseInt(req.params.id));
    if(!todo) return res.status(404).json({message: 'Todo not found'});


    const{task, completed} = req.body;
    if(task !== undefined) todo.task = task;
    if(completed !== undefined) todo.completed = completed;

    res.json(todo);

});

//delete a todo
app.delete('/todos/:id', (req, res) =>{
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if(index === -1) return res.status(404).json({message: 'Todo not found'});

    todos.splice(index, 1);
    res.json({message: 'Todo deleted successfully'});
});

//start the server
app.listen(3000, ()=> console.log('Server running on port 3000'));
