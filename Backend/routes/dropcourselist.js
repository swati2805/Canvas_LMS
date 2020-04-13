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

    console.log("Inside dropcourselist post Request");
    console.log("Req Body : ",req.body);
	
	
	mongo.connect(url, (err1,con) => {
		if(err1){ throw err1;}
		else {

			console.log("Incoming Pname : ", req.body.pname);
			var dbo = con.db("mydb");
            var sql = "SELECT DISTINCT CourseId FROM student_course_map WHERE Student = "+req.body.pname;
			console.log(sql);
			//dbo.collection("student_course_map").distinct("CourseId", {Student : req.body.pname }, function(err2, result) {
			dbo.collection("student_course_map").find({Student : req.body.pname }, { CourseId : 1 } ).toArray(function(err2, result) {
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