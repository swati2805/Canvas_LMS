var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";


function handle_request(req, callback){
    console.log('Inside Kafka Add Quiz Backend', req);


    mongo.connect(url, function(err1,con) {
    if(err1){ throw err1;}
    else {
    
    console.log("inside insert into course_quiz_map1 table");
     var myobj = {
        CourseId : req.body.cid,
        QuizName : req.body.quizname, 
        QuestionNumber : req.body.qcount, 
        Question : req.body.question,
        RightA : req.body.right_a,
        A1 : req.body.a1,
        A2 : req.body.a2,
        A3 : req.body.a3       
    }
    var dbo = con.db("mydb");
    var sql = "KAFKA BACKEND ADD QUIZ MONGO: INSERT INTO course_quiz_map1 (CourseId, QuizName, QuestionNumber, Question, RightA, A1, A2, A3) VALUES "+JSON.stringify(myobj);
    console.log(sql);
   
    dbo.collection("course_quiz_map1").insertOne(myobj, function(err2, result) {
							if(err2) {
								throw err2;
								console.log("Add quiz Failed");
								callback(null, null);
								
							}else {
							    console.log("Quiz Addedd");
								callback(null, {msg : "QUIZ_ADDED"});
								
							}
						});	
						
					
				}	
			});	
			
					
}	



exports.handle_request = handle_request;