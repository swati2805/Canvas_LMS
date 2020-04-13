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

    console.log("Inside addcourse_waitlist Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CID: ",req.body.cid);
	console.log("Req Body Pname: ",req.body.pname);
	
    mongo.connect(url, function(err1,con) {
    if(err1){ throw err1;}
    else {
    
    	console.log("inside student_course_map table");
 		var dbo = con.db("mydb");
 		var myquery = { CourseId : req.body.cid };

    	var sql = "SELECT * FROM course_table1 WHERE CourseId ="+req.body.cid;
    	dbo.collection("course_table1").find(myquery).toArray(function(err2, result)  {
					if(err2) {
						throw err2;
						console.log("User Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Added");
					}else {//First_ELSE//
						console.log("RAGS DEBUG: "+JSON.stringify(result));

						if(parseInt(result[0].CurrentSize,10) < parseInt(result[0].CourseCapacity,10)) 
						{//BIG IF BEGINS

						///// Next Query /////////////////////////
						mongo.connect(url,(err1_next,con_next) => {
    							if(err1_next){ throw err1_next;}
    							else {
    								var dbo_next = con_next.db("mydb");
 									console.log("inside increment current size in courses table");
 									var sql_next = "UPDATE course_table1 SET CurrentSize=CurrentSize+1 WHERE CourseId = "+req.body.cid;
 									dbo_next.collection("course_table1").update({CourseId : req.body.cid}, { $inc: { CurrentSize : 1 } }, (err2_next, result_next) => {
										if(err2_next) {
											throw err2_next;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}
									});	
							
							}	
						});	

						mongo.connect(url, (err1_next1,con_next1) => {
 							if(err1_next1){ throw err1_next1;}
 							else {
 
 								console.log("inside student_course_map table");
 								var dbo_next1 = con_next1.db("mydb");
 								var myobj = {Student : req.body.pname, CourseId : req.body.cid};
 
 								//var sql_next1 = "INSERT INTO student_course_map (Student, CourseId) VALUES ( " +mysql.escape(req.body.pname)+" ,"+mysql.escape(req.body.cid)+ " )";
 								dbo_next1.collection("student_course_map").insertOne(myobj, (err2_next1, result_next1)  => {
										if(err2_next1) {
											throw err2_next1;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}else {

											console.log("User Added Successfully!!!!");
											res.writeHead(200,{'Content-Type' : 'text/plain'})
											res.end("User Added Successfully!!!");
										}
									});	
							
								}	
						});	
						///// Next Query Ends /////////////////////	

						}//BIG IF ENDS/////
						else if ((parseInt(result[0].CurrentSize,10) === parseInt(result[0].CourseCapacity,10)) && (parseInt(result[0].CurrentWaitlistSize,10) >= 0 ))
						{//BIG ELSE IF BEGINS

						///// Next Query /////////////////////////
						mongo.connect(url,(err1_next,con_next) => {
    							if(err1_next){ throw err1_next;}
    							else {
    								var dbo_next = con_next.db("mydb");
 									console.log("inside increment current size in courses table");
 									var sql_next = "UPDATE course_table1 SET CurrentSize=CurrentSize+1 AND CurrentCapacity=CurrentCapacity+1 WHERE CourseId = "+req.body.cid;
 									dbo_next.collection("course_table1").update({CourseId : req.body.cid}, { $inc: { CurrentSize : 1, CourseCapacity : 1 } }, (err2_next, result_next) => {
										if(err2_next) {
											throw err2_next;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}
									});	
							
							}	
						});	

						mongo.connect(url, (err1_next1,con_next1) => {
 							if(err1_next1){ throw err1_next1;}
 							else {
 
 								console.log("inside student_course_map table");
 								var dbo_next1 = con_next1.db("mydb");
 								var myobj = {Student : req.body.pname, CourseId : req.body.cid};
 
 								//var sql_next1 = "INSERT INTO student_course_map (Student, CourseId) VALUES ( " +mysql.escape(req.body.pname)+" ,"+mysql.escape(req.body.cid)+ " )";
 								dbo_next1.collection("student_course_map").insertOne(myobj, (err2_next1, result_next1)  => {
										if(err2_next1) {
											throw err2_next1;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}else {

											console.log("User Added Successfully!!!!");
											res.writeHead(200,{'Content-Type' : 'text/plain'})
											res.end("User Added Successfully!!!");
										}
									});	
							
								}	
						});	
						///// Next Query Ends /////////////////////	
						}//BIG ELSE IF ENDS
						else {
							console.log("COURSE FULL. SHOULD NOT ARRIVE AT THIS CONDITION");
							res.writeHead(400,{'Content-Type' : 'text/plain'});
							res.end("COURSE_FULL");

						} //IF ELSE COMPLETE

					}//First_ELSE ends//
				});	
		
		}	
	});	
    
});




module.exports = app;