
var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";

function handle_request(message, callback){
    console.log('Inside Kafka Method profile-page. Message ', message);
    console.log('Inside Kafka Method profile-page. Message.body ', message.body);

    mongo.connect(url, (err1,con) => {
        if(err1){ throw err1;}
        else {
            
            var dbo = con.db("mydb");
            var sql = "SELECT * FROM profile_table WHERE first_name = " +message.body.pname;
            console.log(sql);
            dbo.collection("profiles").find({first_name : message.body.pname}).toArray(function(err2, result)  {
                if(err2) {
                     throw err2;
                     
                     res.writeHead(400,{'Content-Type' : 'text/plain'});
                     res.end("Query Failed: "+sql);
                }else {
                            console.log(result);
                            if(result === undefined || result.length == 0) {
                                console.log("array empty or does not exist");
                                console.log("No profiles created Yet");
                                callback(err2, null);
                            } else {                                
                                
                                console.log(result);    
                                console.log("Sending Response: "+JSON.stringify(result));
                                callback(err2, result);
                            }
                      
                }
                //dbo.close();
            });             
        }   
    });     

}

exports.handle_request = handle_request;