const mongoose = require('mongoose');
var validator = require('validator');
/*
    email:'some@gmail.com',
    password:''mypaass',
    tokens:

*/
var User = mongoose.model('userr',{
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not an email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

module.exports = {User};
