const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongoose');



var id = '5a5d24c53c101f13488bed45';


//Todo remove



Todo.findById({
        _id:id
    }).then((doc)=>{
        console.log(doc.text);
        
 new Todo({
    text : doc.text
       }).save().then((doc)=>{
           console.log(doc);
       },(e)=>{
           console.log(e);
       });
},(e)=>{
    console.log(e);
});
