var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";


function handle_request(req, callback){
    console.log('Inside Kafka Submit Quiz Backend', req.body);

	
    mongo.connect(url, (err1,con) => {
    if(err1){ throw err1;}
    else {
    
 console.log("KAFKA BACKEND inside insert into student_quiz_map");
 var dbo = con.db("mydb");

    var sql = "KAFKA BACKEND MONGO : INSERT INTO student_quiz_map (CourseId, Student, QuizName, MaxS, MyScore, Taken) VALUES ( " +req.body.cid+" ,"+req.body.pname+" ,"+req.body.QuizName+" ,"+req.body.maxS+" ,"+req.body.myScore+" ,"+req.body.taken+" )";
 var myobj = {
 CourseId: req.body.cid,
 Student: req.body.pname,
 QuizName: req.body.QuizName, 
 MaxS : req.body.maxS, 
 MyScore : req.body.myScore, 
 Taken : req.body.taken 
 }
 
 dbo.collection("student_quiz_map").insertOne(myobj, function (err2, result) {
					if(err2) {
						throw err2;
						console.log("QUIZ_SCORE_NOT_ADDED");
						callback(null, null);
						
					}else {

						callback(null, {msg : "QUIZ_SCORE_ADDED"});
							
					}
				});	
				
			
		}	
	});	
	







			
					
}	



exports.handle_request = handle_request;