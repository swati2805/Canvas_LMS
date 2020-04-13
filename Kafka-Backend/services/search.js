var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";

function handle_request(message, callback){
    console.log('Inside Kafka Method Search. Search KEY is', message.keyid);

        mongo.connect(url, (err1,con) => {
        if(err1){ throw err1;}
        else {
            
            console.log("inside student_course_map table");
                var dbo = con.db("mydb");

            var sql = "SELECT * FROM course_table1 WHERE CourseId LIKE "+"".concat("%",message.keyid, "%");
            console.log("SELECT QUERY is: "+sql);
            dbo.collection("course_table1").find({"CourseId" : new RegExp(message.keyid, 'i') }).toArray(function(err2, result) {
                if(err2) {
                     throw err2;
                     callback(null, null);
                }else {
                            console.log("Course Search Result: "+result);
                            if(result === undefined || result.length == 0) {
                                callback(null, null);
                            } else {                                
                                
                                console.log(result);    
                                console.log(result[0].CourseId);
                                console.log(result[0].CourseName);
                                console.log("Sending Response: "+JSON.stringify(result));
                                callback(null, result);
                            }

                                                    
                }
                //dbo.close();
            });             
        }   
    }); 
}

exports.handle_request = handle_request;