const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id:5
};

var token = jwt.sign(data,'abc3043');

var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmOTg1OTRhMjA1OTM1MDA0ODBhYTciLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTE3MjYyOTM3fQ.LKIfQHWdeni2sZmeY6Q6hDJkjIV0UTpG8vaZb9zA_6U",'some secret key');
console.log(decoded);

// var message = 'I m a easy user';

// var hash = SHA256(message).toString();

// console.log(hash);

// var data = {
//     id:4
// };

// var token = {
//     data,
//     hash:SHA256(JSON.stringify(data)+'somerandomdata').toString()
// };
// manupulating from client side
// token.data.id = 23;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

//verifying the recieved token

// var resultHash = SHA256(JSON.stringify(token.data)+'somerandomdata').toString();

// if(resultHash === token.hash){
//     console.log('the recieved token was correct');
// } else{
//     console.log('the recieved data was not correct');
// }