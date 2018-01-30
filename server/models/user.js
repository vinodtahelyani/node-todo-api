const mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true,
        // validate:{
        //     validator:validator.isEmail,
        //     message:'{VALUE} is not an email'
        // }
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
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
UserSchema.methods.toJSON = function(){
    var user = this;
    var UserObject = user.toObject();

    return _.pick(UserObject,['_id','email']);
};

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded ;
    try{
    decoded=jwt.verify(token,'some secret key');
    }catch(e){
         return Promise.reject(e.message);
    }
   return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    }).then((doc)=>{
        return doc;
    });
   
};

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString(),access},'some secret key').toString();

    user.tokens.push({access,token});

    return user.save().then(() =>{
        return token;
    });
};


var User = mongoose.model('userr',UserSchema);

module.exports = {User};
