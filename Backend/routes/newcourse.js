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
//Route to handle Post Request Call
app.post('/',function(req,res){

    console.log("Inside add newcourse Post Request");
    console.log("New Course Req Body : ",req.body);
	
	mongo.connect(url, function (err, db) {
		if (err) throw err;
		else {
			
			console.log("inside insert into course table");

				var myobj = {
					CourseId : req.body.CourseId,
					CourseName : req.body.CourseName,
					CourseDept : req.body.CourseDept,
					CourseDescription : req.body.CourseDescription,
					CourseRoom : req.body.CourseRoom,
					CourseCapacity : req.body.CourseCapacity,
					WaitlistCapacity : req.body.WaitlistCapacity,
					CourseTerm : req.body.CourseTerm,
					Faculty : req.body.Faculty,
					CurrentSize : 0,
					CurrentWaitlistSize : 0
				};
				var dbo = db.db("mydb");
				dbo.collection("course_table1").insertOne(myobj, function (err2,result) {
					if(err2) {
						throw err2;
						console.log("Course Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Added");
					}else {
							console.log("New Course Added Successfully!!!!");
							res.writeHead(200,{'Content-Type' : 'text/plain'})
							res.end("User Added Successfully!!!");
					}
					db.close();
				});	
				
			
		}	
	});	
	
	
    
});






module.exports = app;