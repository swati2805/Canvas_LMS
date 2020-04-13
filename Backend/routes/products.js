//Login.js - Login route module
var express = require('express');
var app = express.Router();
//Kafka
var kafka = require('../kafka/client');
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
const secret = "secret";
var url = "mongodb://localhost:27017/";
var mongo = require('mongodb').MongoClient;

app.get('/',function(req,res){

    console.log("Inside Products Get Request");
    console.log("Req Body : ",req.body);
	
	
	
	mongo.connect(url, (err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside student_course_map table");
				var dbo = con.db("mydb");
				var myquery = {};

            var sql = "SELECT * FROM course_table1";
			console.log(sql);
			dbo.collection("course_table1").find(myquery).toArray(function(err2, result){
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Course Exist Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("No Course Exist Yet");
							} else {								
								
								console.log(result);	
								console.log(result[0].CourseId);
								console.log(result[0].CourseName);
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

					
				}
				dbo.close();
			});				
		}	
	});		

    
});






module.exports = app;