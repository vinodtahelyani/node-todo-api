const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongoose');



var id = '5a59dcc9d94bfc16c4bd727d';

// if(ObjectId.isValid(id)){
//     console.log('valid id');
// }
// else{
//     console.log('Invalid id');
// }

console.log(mongoose.Types.ObjectID.isValid('53cb6b9b4f4ddef1ad47f943'));
// Todo.find({
//     _id:id
// }).then((docs)=>{
//     if(docs.length === 0)return console.log('cannot match the given Id');
//     console.log(docs);
// },(e)=>{
//     console.log(e.message);
// });

// Todo.findOne({
//     text:'dkjd'
// }).then((doc)=>{
//     if(doc === null)return console.log('cannot match the given Id');
//     console.log('doc',doc);
// },(e)=>{
//     console.log(e.message);
// });

// Todo.findById(id).then((doc)=>{
//     if(doc === null)return console.log('cannot match the given Id');
//     console.log(doc);
// },(e)=>{
//     console.log(e.message);
// });



// User.find().then((doc)=>{
//     console.log('doc',doc);
// }).catch((e)=>{
//     console.log('e',e);
// });

// User.findById({
//     _id:id
// }).then((doc)=>{
//     if(doc === null)return console.log('cannot match the given Id');
//     console.log('doc',doc);
// }).catch((e)=>{
//     console.log('e',e);
// });