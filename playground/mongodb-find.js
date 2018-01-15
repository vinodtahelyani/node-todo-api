var {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://test:test@ds247027.mlab.com:47027/todo-api',(err,db)=>{
    if(err){
        return console.log('unable to connect');
    }
    console.log('success fully connected');
        //     db.collection('user').find().toArray().then((docs)=>{
        //         console.log(JSON.stringify(docs,undefined,2));
        //     }).catch((err)=>{
        //         console.log(err.message);
        //     })
        // 


        // db.collection('user').deleteMany({name:'vinod'}).then((result)=>{
        //     console.log(result);
        // }).catch((err)=>{
        //     console.log(err.message);
        // });

        // db.collection('user').findOneAndDelete({name:'vinod thaelyani'}).then((result)=>{
        //     console.log(JSON.stringify(result,undefined,2));
        // }).catch((err)=>{
        //     console.log(err.message);
        // });

        // db.collection('user').findOneAndUpdate({
        //     //_id: new ObjectID('5a5640f275475d153befc64e')
        //     name:name+"jhony"
        // },{
        //     $set:{
        //         location: 'delhi'
        //     }
        // },{
        //         returnOriginal:false
        //     }).then((result)=>{
        //         console.log(result);
        //     }).catch((err)=>{
        //         console.log(err.message);
        //     });

        db.collection('user').findOneAndUpdate({
            name:"jhony bravo"
        },{
            $inc:{
                age:1
            }
        },{
            returnOriginal:false
        }).then((doc)=>{
            console.log(doc);
        });



});