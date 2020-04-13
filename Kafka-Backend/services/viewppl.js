var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";


function handle_request(req, callback){
    console.log('Inside Kafka ViewPeople Backend', req);


   mongo.connect(url, (err1,con) => {
    if(err1){ throw err1;}
    else {

    var sql = "KAFKA BACKEND MONGO: SELECT DISTINCT Student FROM student_course_map WHERE CourseId = " +req.cid;
    console.log(sql);
    var dbo = con.db("mydb");
    dbo.collection("student_course_map").find({CourseId : req.cid }, { Student : 1 } ).toArray(function(err2, result) {
				if(err2) {
					 throw err2;
					 callback(null, null);
				}else {
							
							if(result === undefined || result.length == 0) {
								callback(null, null);
								
							} else {	

							    console.log(result);               
                                console.log("KAFKA Backend Sending Response: "+JSON.stringify(result));
                                callback(null, result);							
								
								
							}

												
				}
			});				
		}	
	});		







			
					
}	



exports.handle_request = handle_request;