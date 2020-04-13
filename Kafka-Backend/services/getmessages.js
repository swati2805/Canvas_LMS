var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";


function handle_request(req, callback){
    console.log('Inside Kafka Backend Get Message for : ', req.body);

	
	mongo.connect(url, (err1,con) => {
		if(err1){ throw err1;}
		else {
			
		
				var dbo = con.db("mydb");
				var myquery = {to : req.body.to};

            
			dbo.collection("message_table").find(myquery).toArray(function(err2, result){
				if(err2) {
					 throw err2;
					 
					 callback(null, null);
				}else {
							//console.log(result);
							if(result === undefined || result.length == 0) {
								callback(null, null);
								
							} else {	

								console.log("Kafka Backend Sending Get Message List: "+JSON.stringify(result))
								callback(null, result);
								
							}

					
				}
			
			});				
		}	
	});	







			
					
}	



exports.handle_request = handle_request;