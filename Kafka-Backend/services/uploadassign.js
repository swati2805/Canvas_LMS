var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";


function handle_request(req, callback){
    console.log('Inside Kafka Assign Upload Backend', req);

	mongo.connect(url, function (err1,con) {
	if(err1){ throw err1;}
	else {
	
	console.log("inside insert into course_assign_map table");
	var dbo = con.db("mydb");
	var sql = "KAFKA BACKEND MONGO : INSERT INTO course_assignment_map (CourseId, Faculty, AssignName, FileName) VALUES ( " +req.body.cid+" ,"+req.body.userid+" ,"+req.body.AssignName+" ,"+req.files.file.name+" )";
	console.log(sql);
	var myobj = {
	CourseId: req.body.cid,
	Faculty: req.body.userid,
	AssignName: req.body.AssignName,
	FileName: req.files.file.name
	}
	dbo.collection("course_assignment_map").insertOne(myobj, function (err2, result) {
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
						
					
}	







exports.handle_request = handle_request;