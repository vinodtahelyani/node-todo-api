var mongoose = require('mongoose');
var User = mongoose.model('userr',{
    email:{
        type:String,
        required:true,
        miinlength:1,
        trim:true
    }
});

module.exports = {User};
