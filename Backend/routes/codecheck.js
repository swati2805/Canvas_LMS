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

    console.log("Inside codecheck Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CourseID: ",req.body.cid);
	console.log("Req Body For Student: ",req.body.pname);
	console.log("Req Body Code: ",req.body.code);
	
    mongo.connect(url, function (err1,con) {
    if(err1){ throw err1;}
    else {
    
 			console.log("inside read from code_course_map table");
 			var dbo = con.db("mydb");

    		var sql = "SELECT Code FROM code_course_map WHERE Student = "+req.body.pname+" AND CourseId = "+req.body.cid;
 			console.log(sql);
 			dbo.collection("code_course_map").find({Student : req.body.pname, CourseId : req.body.cid}, {Code : 1}).toArray(function(err2, result) {
					if(err2) {
						throw err2;
						console.log("Code Counldn't be Found!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("Code Counldn't be Found");
					}else {
						  console.log(result);
						  if(result[0].Code == req.body.code) {
							console.log("Code Added Successfully!!!!");
							res.writeHead(200,{'Content-Type' : 'text/plain'})
							res.end("CODE_CHECK_SUCCESS");
						  } else {
							console.log("Code Counldn't be Found!!!!");
							res.writeHead(400,{'Content-Type' : 'text/plain'});
							res.end("CODE_CHECK_FAILED");
						  }
					}
				});	
				
			
		}	
	});	
	
	
    
});





module.exports = app;