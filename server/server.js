var express = require('express');
var bodyParser = require('body-parser');


var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo')
var {
    User
} = require('./models/user')

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((todo) => {
        res.status(200).send(todo);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({
            todos
        })
    }, (e) => {
        res.status(400).send(e);
    });
});


app.listen(3000, () => {
    console.log('server is up on port 3000');

})

module.exports = {app}