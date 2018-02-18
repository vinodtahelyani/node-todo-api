const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

var password = "somerandompassword";

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     });
// });

var hashedPassword = "$2a$10$wse5sT8vCakBnUvAenp9/eomXTKHXh9P1N9F2PgRorW0zyq913VuS";

bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log(res);
});