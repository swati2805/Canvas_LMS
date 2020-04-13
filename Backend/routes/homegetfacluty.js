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

    console.log("Inside homegetfacluty Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body Pname: ",req.body.pname);
	
	mongo.connect(url, (err1,con) => {
		if(err1){ throw err1;}
		else {
			var dbo = con.db("mydb");
			var sql = "SELECT CourseId, CourseName, Faculty, CourseTerm FROM course_table1 WHERE Faculty =" +req.body.pname;
				console.log(sql);
				dbo.collection("course_table1").find({Faculty : req.body.pname }, {CourseId: 1, CourseName:1 , Faculty: 1, CourseTerm: 1}).toArray(function(err2, result) {
					if(err2) {
						throw err2;
						console.log("Query Failed");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("Query Failed");
					}else {

						console.log(result);
						if(result === undefined || result.length == 0) {
							console.log("array empty or does not exist");
							console.log("NO_COURSE_YET For Faculty "+req.body.pname);
							res.writeHead(200,{'Content-Type' : 'text/plain'});
							res.end("NO_COURSE_YET");
						} else {								
							
							console.log(result);	
							console.log(result[0].ptype);
							console.log("Sending Response Prof Cources: "+JSON.stringify(result));
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