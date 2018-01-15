var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User}  = require('./models/user');
const {ObjectId} = require('mongoose').Types;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/todos',urlencodedParser,(req,res)=>{
    var todo = new Todo(req.body);
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(eq,res)=>{
    Todo.find().then((doc)=>{
        res.send({
            todos:doc,
            status:200
        });
    },(e)=>{
        res.status(400).send(e);
    }); 
});

app.get('/todos/:id',(req,res)=>{
    if(! ObjectId.isValid(req.params.id)) return res.status(400).send('Invalid Id');
    User.findById(req.params.id).then((doc)=>{
        if(doc === null)return res.send('Cannot match the given Id');
        res.send(doc);
    }).catch((e)=>{
        res.status(400).send('Oops Something went wrong! Try after some time:-(');
    });
});

app.listen('3000',()=>{
    console.log('Listening on port 3000');
});