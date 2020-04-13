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

    console.log("Inside coursegetquizkaten Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	console.log("Course Student : "+req.body.pname);
	
    mongo.connect(url, (err1,con) => {
    if(err1){ throw err1;}
    else {

    var sql = "SELECT DISTINCT * FROM student_quiz_map WHERE CourseId = " +req.body.cid+" AND Student = "+req.body.pname;
 console.log(sql);
 var dbo = con.db("mydb");
 var myquery = {};
    dbo.collection("student_quiz_map").find({CourseId : req.body.cid, Student : req.body.pname}).toArray(function(err2, result){
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No QUIZ Yet for Student");
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