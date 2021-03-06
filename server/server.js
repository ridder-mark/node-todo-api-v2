var express = require('express');
var bodyParser = require('body-parser');

const {
    ObjectID
} = require('mongodb');

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

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID')
    }

    Todo.findById(id).then((todo) => {
        res.status(200).send(todo);
        

    }).catch((e) => {
        res.status(400).send(e);
});

});


app.listen(3000, () => {
    console.log('server is up on port 3000');
})

module.exports = {
    app
}