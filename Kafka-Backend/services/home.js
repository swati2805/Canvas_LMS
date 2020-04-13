var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";

function handle_request(message, callback){
    console.log('Inside Kafka Method Home. Search cources for student ', message.pname);

        mongo.connect(url, (err1,con) => {
        if(err1){ throw err1;}
        else {

            console.log("Incoming Pname : ", message.pname);
          
            var dbo = con.db("mydb");
            var sql = "SELECT CourseId FROM student_course_map WHERE Student = "+message.pname;
            console.log(sql);
            dbo.collection("student_course_map").find({Student : message.pname }, { CourseId : 1 } ).toArray(function(err2, result) {
                if(err2) {
                     throw err2;
                     
                     res.writeHead(400,{'Content-Type' : 'text/plain'});
                     res.end("User Not Found in student-course map");
                }else {     
                            console.log(result);
                            if(result === undefined || result.length == 0) {
                                console.log("No Courses registered for student yet");
                                callback(null, null);

                            } else {

                    /////////////////////////// NEXT QUERY STARTS /////////////////////////////////////////////////////         
                                console.log("Courses found in Database!!!!");
                                console.log(result);
                                console.log("STARTING NEXT QUERY")

                                mongo.connect(url, (err1_next, con_next) => {
                                    if(err1_next){ throw err1_next;}
                                    else {
                                        var dbo_next = con_next.db("mydb");
                                        
                                          var arrayC = [];
                                          arrayC = result.map((c) => {
                                              return c.CourseId
                                          });
                                        
                                        console.log("Sending next query with results");
                                    
                                        dbo_next.collection("course_table1").find({ CourseId: { $in: arrayC } }, {CourseId: 1, CourseName : 1, Faculty : 1, CourseTerm : 1 }).toArray(function(err2_next, result_next) {
                                            if(err2_next) {
                                                 throw err2_next;
                                                 
                                                  callback(null, null);
                                            }else {     
                                                        console.log(result_next);
                                                        if(result_next === undefined || result_next.length == 0) {
                                                            console.log("Course Not found in courses table");
                                                             callback(null, null);
                            
                                                        } else {
                                                            console.log("Courses found in Database!!!!");
                                                            console.log(result_next);
                            
                                                               
                                                                 callback(null, result_next);
                            
                                                        }
                            
                            
                                                        
                                            }
                                            //dbo_next.close();
                                        });             
                                    }   
                                }); 

                           ////////////// NEXT QUERY ENDS //////////////////////////////////

                            }


                            
                }
                //dbo.close();
            });             
        }   
    }); 
    


}

exports.handle_request = handle_request;