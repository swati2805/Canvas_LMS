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


app.post('/',function(req,res){

    console.log("Inside quizview Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	console.log("QuizName : "+req.body.QuizName);
	
	
   mongo.connect(url, (err1,con) => {
    if(err1){ throw err1;}
    else {

    var sql = "SELECT DISTINCT * FROM course_quiz_map1 WHERE CourseId = "+req.body.cid+" AND QuizName = "+req.body.QuizName;
    console.log(sql);
    var dbo = con.db("mydb");
    dbo.collection("course_quiz_map1").find({CourseId : req.body.cid, QuizName : req.body.QuizName}).toArray(function(err2, result){
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No QUIZ Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_QUIZS_YET");
							} else {								
								
								console.log(result);	
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

									
				}
			});				
		}	
	});		

    
});





module.exports = app;