var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User}  = require('./models/user');
const {ObjectId} = require('mongoose').Types;
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var authenticate =require('./../middlewares/authenticate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var app = express();
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/todos',urlencodedParser,(req,res)=>{
    var todo = new Todo(req.body);
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((doc)=>{
        res.send({
            todos:doc,
            status:200
        });
    },(e)=>{
        res.status(400).send(e);
    }); 
});

app.delete('/todos/:id',(req,res)=>{
    if(! ObjectId.isValid(req.params.id))return res.status(400).send('Invalid Id');
    Todo.findByIdAndRemove(req.params.id).then((doc)=>{
        if(doc === null)return res.status(400).send({message:'Item not present',status:400});
        res.status(200).send({message:'Item successfully deleted',doc});
    },(e)=>{
        res.send({message:'Some error occured',status:400});
    });
});

app.get('/todos/:id',(req,res)=>{
    if(! ObjectId.isValid(req.params.id))return res.status(400).send('Invalid Id');
    Todo.findById(req.params.id).then((doc)=>{
        console.log(req.params.id);
        console.log(doc);
        if(doc === null)return res.send('Cannot match the given Id');
        res.send(doc);
    }).catch((e)=>{
        res.status(400).send('Oops Something went wrong! Try after some time :-(');
    });
});


app.patch('/todos/:id',urlencodedParser,(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(! ObjectId.isValid(id))return res.status(400).send('Invalid Id');
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completedAt = null;
        body.completed = false;
    }
    Todo.findByIdAndUpdate({
        _id :id
    },{
        $set:body
    },{
        new :true
    }).then((doc)=>{
        res.status(200).send({
            status:200,
            doc
        });
    },(e)=>{
        res.send(e.message);
    });
});


//user request

app.post('/user',urlencodedParser,(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var usr = new User(body);
    usr.generateAuthToken().then((token)=>{
        res.header('x-auth',token).send(usr);
    }).catch((e)=>{
        res.status(400).send(e.message);
    });  
});

app.post('/user/signin',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user)=>{
        user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
    }).catch((e)=>{
        res.status(400).send(e);        
    });
});

app.get('/user/me',authenticate,(req,res)=>{
        res.send(req.user);
});

app.delete('/user/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }).catch((e)=>{
        res.status(400).send(e);                
    });
});

app.listen('3000',()=>{
    console.log('Listening on port 3000');
});