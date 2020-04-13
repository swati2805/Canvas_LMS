var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";


function handle_request(req, callback){
    console.log('Inside Kafka Backend Send Message ', req.body);

	
	mongo.connect(url, function (err, db) {
		if (err) throw err;
		else {
			
			console.log("Kafka Backend inside insert into message table");

				var myobj = {
					from : req.body.from,
					to : req.body.to,
					content : req.body.content
				};
				var dbo = db.db("mydb");
				dbo.collection("message_table").insertOne(myobj, function (err2,result) {
					if(err2) {
						throw err2;
						callback(null, null);
						
					}else {
						console.log("Kafka Backend Message Added")
						callback(null, {msg : "Message Added"});
							
					}
					
				});	
				
			
		}	
	});	


			
					
}	



exports.handle_request = handle_request;