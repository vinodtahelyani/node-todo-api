const mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not an email'
        },
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

//owerwrite toJSON
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

UserSchema.statics.findByCredentials = function(email,password){
        return User.findOne({email}).then((user)=>{
        if(!user)return Promise.reject('no email');
        return bcrypt.compare(password,user.password).then((result)=>{           
            if(!result)return Promise.reject('password incorrect');
            return user;
        });
    });
};

UserSchema.pre('save',function(next){
    var user = this;    
    if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password = hash;
            next();
        });
    });
    }else{
        next();
    }
});

UserSchema.methods.removeToken = function(token){
    var user = this;
    return User.findOneAndUpdate({_id:user._id},{
        $pull:{
            tokens:{
                token:token
            }
        }}).then(()=>{
        return Promise.resolve();
    }).catch((e)=>{
        console.log('***');        
        return Promise.reject();
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
