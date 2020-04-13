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

    console.log("Inside homegetinfo Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body Pname: ",req.body.pname);
	
	mongo.connect(url, (err1,con) => {
		if(err1){ throw err1;}
		else {
			var dbo = con.db("mydb");
				var sql = "SELECT DISTINCT ptype FROM profile_table WHERE first_name =" +req.body.pname;
				console.log(sql);
				dbo.collection("profiles").find({first_name : req.body.pname }, {ptype:1}).toArray(function(err2, result) {
					if(err2) {
						throw err2;
						console.log("Query Failed");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("Query Failed");
					}else {

						console.log(result);
						if(result === undefined || result.length == 0) {
							console.log("array empty or does not exist");
							console.log("User Not Found in profiles table");
							res.writeHead(400,{'Content-Type' : 'text/plain'});
							res.end("User Not Found in profiles table");
						} else {								
							
							console.log(result);	
							console.log(result[0].ptype);
							console.log("Sending Response PTYPE from route homegetinfo: "+JSON.stringify(result));
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