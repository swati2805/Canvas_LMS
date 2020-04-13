var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";

function handle_request(req, callback){
    console.log('Inside Kafka Backend Grade Submission', req);

    mongo.connect(url, function(err1,con) {
    if(err1){ throw err1;}
    else {
    var dbo = con.db("mydb");
    var myquery = { CourseId : req.body.cid, AssignName : req.body.AssignName, Student : req.body.pname };
    var newvalues = { $set: { Grade : req.body.grade } };
    console.log("inside insert into student_assignment_map table");
    
    var sql = "KAFKA BACKEND: UPDATE student_assignment_map SET Grade = "+req.body.grade+" WHERE CourseId = " +req.body.cid+" AND AssignName = " +req.body.AssignName+" AND Student = " +req.body.pname;
                    console.log(sql);
    dbo.collection("student_assignment_map").updateOne(myquery, newvalues, function(err2, result)  {
                            if(err2) {
                                throw err2;
                                console.log("Grades Upload Failed");
                                callback(err2, null);
                            }else {
                            
                                callback(err2, {msg : "GRADES_UPLOADED"});
                            }
                        }); 
                        
                    
                }   
            }); 




}

exports.handle_request = handle_request;