
var url = "mongodb://localhost:27017/";

var mongo = require('mongodb').MongoClient;

function handle_request(req, callback){
    console.log('Inside Kafka Assign Upload Backend', req);
		//else starts

 mongo.connect(url, function(err1,con) {
	if(err1){ throw err1;}
	else {
	
	console.log("inside insert into course_assign_map table");
	var dbo = con.db("mydb");
	
	var sql = "INSERT INTO student_assignment_map (Student, CourseId, AssignName, FileName, Grade) VALUES ( " +req.body.userid+" ,"+req.body.cid+" ,"+req.body.AssignName+" ,"+req.files.file.name+",0 )";
	console.log(sql);
	var myobj = {
	CourseId: req.body.cid,
	Student: req.body.userid,
	AssignName: req.body.AssignName,
	FileName: req.files.file.name,
	Grade : 0
	}
	dbo.collection("student_assignment_map").insertOne(myobj, function (err2, result) {
							if(err2) {
								throw err2;
								console.log("Upload Failed");
								callback(null, null);
							}else {
								
								var result = {
									file: `uploads/assignments/${req.files.file.name}`,
								};  
								console.log("Sending Response File Path Uploaded: "+JSON.stringify(result));
								callback(null, result);
							}
						});	
						
					
				}	
			});	

}//else ends

exports.handle_request = handle_request;





