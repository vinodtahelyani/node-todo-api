var {User} = require('./../server/models/user');

module.exports = (req,res,next)=>{
    var token = req.headers['x-auth'];
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch(()=>{
        res.status(401).send();
    });
    
};