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

    console.log("Inside addcode Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CourseID: ",req.body.cid);
	console.log("Req Body For Student: ",req.body.studentName);
	console.log("Req Body Code: ",req.body.code);
	
    mongo.connect(url, (err1,con) =>{
    if(err1){ throw err1;}
    else {
    
 			console.log("inside insert into code_course_map table");
 			var dbo = con.db("mydb");
 			var sql = "INSERT INTO code_course_map (CourseId, Student, Code) VALUES ( "+req.body.cid+" ,"+req.body.studentName+" ,"+req.body.code+" )";
 			console.log(sql);
 			var myobj = {
 				CourseId: req.body.cid,
 				Student: req.body.studentName,
 				Code : req.body.code
 			}
 
 			dbo.collection("code_course_map").insertOne(myobj, function (err2, result)  {
					if(err2) {
						throw err2;
						console.log("Code Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("Code Counldn't be Added");
					}else {
							console.log("Code Added Successfully!!!!");
							res.writeHead(200,{'Content-Type' : 'text/plain'})
							res.end("Code Added Successfully!!!");
					}
				});	
				
			
		}	
	});	
	
	
    
});





module.exports = app;