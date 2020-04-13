var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";


function handle_request(req, callback){
    console.log('Inside Kafka ADD ANNBackend', req);


    mongo.connect(url, function(err1,con) {
    if(err1){ throw err1;}
    else {
    
    console.log("inside insert into course_ann_map table");
    var dbo = con.db("mydb");
    var sql = "KAFKA BACKEND FOR ADD ADD MONGO: INSERT INTO course_ann_map (CourseId, AnnTitle, AnnContent) VALUES ( "+req.body.cid+" ,"+req.body.annTitle+" ,"+req.body.annContent+")";
                    console.log(sql);
    var myobj = {
        CourseId : req.body.cid,
        AnnTitle : req.body.annTitle, 
        AnnContent : req.body.annContent
    }
                    
    dbo.collection("course_ann_map").insertOne(myobj, function (err2, result){
							if(err2) {
								throw err2;
								console.log("Ann ADD Failed");
								callback(null, null);
							}else {
							
								callback(null, {msg : "ADD ADDED SUCCESSFULLY"});
							}
						});	
						
					
				}	
	});	
		
					
}	



exports.handle_request = handle_request;