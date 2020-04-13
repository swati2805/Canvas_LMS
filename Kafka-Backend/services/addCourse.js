
var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";

function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Add Course');
    console.log('KB: Message', msg);


    mongo.connect(url, (err1,con) => {
        if(err1){ throw err1;}
        else {
            
            console.log("inside student_course_map table");
                var dbo = con.db("mydb");
                var myquery = { CourseId : msg.cid };

                //var sql = "SELECT * FROM course_table1 WHERE CourseId ="+mysql.escape(req.body.cid);
                dbo.collection("course_table1").find(myquery).toArray(function(err2, result)  {
                    if(err2) {
                        throw err2;
                        console.log("User Counldn't be Added!!!!");
                        callback(null, null);
                    }else {//First_ELSE//
                        console.log("RAGS DEBUG: "+JSON.stringify(result));

                        if(parseInt(result[0].CurrentSize,10) < parseInt(result[0].CourseCapacity,10)) 
                        {//BIG IF BEGINS

                        ///// Next Query /////////////////////////
                        mongo.connect(url, (err1_next,con_next) => {
                            if(err1_next){ throw err1_next;}
                            else {
                                
                                var dbo_next = con_next.db("mydb");
                                console.log("inside increment current size in courses table");
                    
                                    var sql_next = "UPDATE course_table1 SET CurrentSize=CurrentSize+1 WHERE CourseId = "+msg.cid;
                                    console.log(sql_next);
                                    dbo_next.collection("course_table1").update({CourseId : msg.cid}, { $inc: { CurrentSize : 1 } }, (err2_next, result_next) => {
                                        if(err2_next) {
                                            throw err2_next;
                                            console.log("User Counldn't be Added!!!!");
                                            callback(null, null);
                                        }
                                        
                                    }); 
                                    //dbo_next.close();
                            
                            }   
                        }); 

                        mongo.connect(url, (err1_next1,con_next1) => {
                            if(err1_next1){ throw err1_next1;}
                            else {
                                
                                console.log("inside student_course_map table");
                                var dbo_next1 = con_next1.db("mydb");
                                var myobj = {Student : msg.pname, CourseId : msg.cid};
                    
                                    //var sql_next1 = "INSERT INTO student_course_map (Student, CourseId) VALUES ( " +mysql.escape(req.body.pname)+" ,"+mysql.escape(req.body.cid)+ " )";
                                    dbo_next1.collection("student_course_map").insertOne(myobj,  (err2_next1, result_next1) => {
                                        if(err2_next1) {
                                            throw err2_next1;
                                            console.log("User Counldn't be Added!!!!");
                                            callback(null, null);
                                        }else {

                                            console.log("User Added Successfully!!!!");
                                            callback(null, {msg : "KB says user added"});
                                        }
                                        
                                    }); 
                                    //dbo_next1.close();
                            
                                }   
                        }); 
                        ///// Next Query Ends ///////////////////// 

                        }//BIG IF ENDS/////
                        else if ((parseInt(result[0].CurrentSize,10) === parseInt(result[0].CourseCapacity,10)) && (parseInt(result[0].CurrentWaitlistSize,10) < parseInt(result[0].WaitlistCapacity,10)))
                        {//BIG ELSE IF BEGINS

                        ///// Next Query /////////////////////////
                        mongo.connect(url, (err1_next,con_next) => {
                            if(err1_next){ throw err1_next;}
                            else {
                                
                                var dbo_next = con_next.db("mydb");
                                console.log("inside increment current size in courses table");
                    
                                    var sql_next = "UPDATE course_table1 SET CurrentWaitlistSize=CurrentWaitlistSize+1 WHERE CourseId = "+msg.cid;
                                    console.log(sql_next);
                                    dbo_next.collection("course_table1").update({CourseId : msg.cid}, { $inc: { CurrentWaitlistSize : 1 } }, (err2_next, result_next) => {
                                        if(err2_next) {
                                            throw err2_next;
                                            console.log("User Counldn't be Added!!!!");
                                            callback(null, null);
                                        }
                                        
                                    }); 
                                    //dbo_next.close();
                            
                            }   
                        }); 

                        mongo.connect(url, (err1_next1,con_next1) => {
                            if(err1_next1){ throw err1_next1;}
                            else {
                                
                                console.log("inside student_course_map table");
                                var dbo_next1 = con_next1.db("mydb");
                                var myobj = {Student : msg.pname, CourseId : msg.cid};
                    
                                    //var sql_next1 = "INSERT INTO student_course_map (Student, CourseId) VALUES ( " +mysql.escape(req.body.pname)+" ,"+mysql.escape(req.body.cid)+ " )";
                                    dbo_next1.collection("student_course_map").insertOne(myobj,  (err2_next1, result_next1) => {
                                        if(err2_next1) {
                                            throw err2_next1;
                                            console.log("User Counldn't be Added!!!!");
                                            callback(null, null);
                                        }else {

                                            console.log("User Added Successfully!!!!");
                                            callback(null, {msg : "KB says user added"});
                                        }
                                        
                                    }); 
                                    //dbo_next1.close();
                            
                                }   
                        }); 
                        ///// Next Query Ends ///////////////////// 
                        }//BIG ELSE IF ENDS
                        else {
                            console.log("COURSE FULL. SHOULD NOT ARRIVE AT THIS CONDITION");
                            callback(null, null);

                        } //IF ELSE COMPLETE

                    }//First_ELSE ends//
                    
                }); 
            //dbo.close();
        
        }   
    }); 

}

exports.handle_request = handle_request;