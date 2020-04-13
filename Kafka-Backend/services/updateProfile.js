var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";

const bcrypt = require('bcrypt');

function handle_request(req, callback){
    console.log('Inside Kafka Backend Update Profile With Values: ', req.body);


mongo.connect(url, function (err, db) {
		if (err) throw err;
		else {
			
			console.log("Kafka Backend  inside insert into profiles table");
			console.log("Kafka Backend  Password : ", req.body.password);
			
			bcrypt.hash(req.body.password, 10, function(err3, encrypted_password) {
			  if(err3) throw err3;
			  else 
			  {
				console.log(encrypted_password);
				//console.log(sql);
				var dbo = db.db("mydb");
				var myquery = { first_name : req.body.first_name };

				var myobj = null;
				if(req.body.isFile === 'FILE') {
				myobj = {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: encrypted_password,
					city: req.body.city,
					gender: req.body.gender,
					phone_number: req.body.phone_number,
					school: req.body.school,
					hometown: req.body.hometown,
					company: req.body.company,
					languages: req.body.languages,
					country: req.body.country,
					about_me: req.body.about_me,
					profile_pic : req.files.file.name,
					ptype: req.body.ptype
				};
			} else {
				myobj = {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: encrypted_password,
					city: req.body.city,
					gender: req.body.gender,
					phone_number: req.body.phone_number,
					school: req.body.school,
					hometown: req.body.hometown,
					company: req.body.company,
					languages: req.body.languages,
					country: req.body.country,
					about_me: req.body.about_me,
					profile_pic : '',
					ptype: req.body.ptype
				};
			}

				var newvalues = { $set: myobj };
				dbo.collection("profiles").updateOne(myquery, newvalues, function(err2, result) {
					if(err2) {
						throw err2;
						callback(null, null);
						
					}else {

						console.log('Inside Kafka Backend Updated Profile Successfully');
						callback(null, {msg : "profile updated successfully"});
							
					}
					
				});	
				
			  }	
				
            });				
		}	
	});	

	
					
}	



exports.handle_request = handle_request;