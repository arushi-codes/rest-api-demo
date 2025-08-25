const express = require('express');
const app = express();

app.use(express.json());

let users = [];
let idCounter = 1;


//get operation 
app.get('/users', (req,res) =>{

    res.json(users);

});

//get single user by id
app.get('/users/:id', (req, res)=>{
 const user = users.find(t=> t.id === parseInt(req.params.id));
 if(!user) return res.status(404).json({message: 'user not found'});
 res.json(user);
});

//post request for a new user
app.post('/users',(req,res) =>{

    const{name} = req.body;
    if(!name) return res.status(400).json({message: 'Name is required'});

    const newUser = {
       id: idCounter++,
       name
    };

    users.push(newUser);
    res.status(201).json(newUser);

});


//put request to unpdate users
app.put('/users/:id', (req, res) =>{
    const user = users.find(t => t.id === parseInt(req.params.id));
    if(!user) return res.status(404).json({message: 'User not found'});

     const{name} = req.body;
     if(name) user.name = name;


    res.json(user);

});

//deleting a user
app.delete('/users/:id', (req,res) =>{

    const index = users.findIndex( t=> t.id === parseInt(req.params.id));
    if(index === -1) return res.status(404).json({message: 'User not found'});

    users.splice(index, 1);
    res.json({message: 'User deleted successfully'});

});

//start the server
app.listen(3000, ()=> console.log('Server running on port 3000'));

