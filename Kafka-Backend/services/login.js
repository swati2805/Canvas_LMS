//const url = require('../DatabaseConnection');
const bcrypt = require('bcrypt');
var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";

function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');
    console.log('KB: Message', msg);


    mongo.connect(url, function (err, db) {
        if (err) throw err;
        else {
            
            console.log("KB inside login password checking");
            //var encrypted_password = encrypt(req.body.password);
            console.log("KB Incoming Password : ", msg.password);

            var dbo = db.db("mydb");
            var query = { first_name: msg.username };
            dbo.collection("profiles").find(query).toArray(function(err2, result)  {
                if(err2) {
                     throw err2;
                     callback(null, null);
                }else {
                            console.log("KB Login User Found in Database!!!!");
                            console.log("KB User details ", result[0]);
                            console.log(result[0].first_name);
                            console.log(result[0].password);
                            //var temp = { iv: my_iv, encryptedData: result[0].password };
                            //var decrypted_password = decrypt(temp);
                            //console.log("decrypted_password: "+decrypted_password);
                            bcrypt.compare(msg.password, result[0].password, function(err3, match) {
                            if(err3) throw err3;    
                            if(match)
                            {   console.log("password checking successfull");
                                callback(null, result[0]);
                            } else {
                                console.log('Invalid Credentials!');
                                callback(null, null); 
                            }
                            });

                            
                }
                //db.close();
            });             
        }   
    }); 

}

exports.handle_request = handle_request;