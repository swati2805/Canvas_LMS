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

app.post('/',function(req,res){

    console.log("Inside Search Post Request");
    console.log("Req Body : ",req.body);
	console.log("Req Body Key : ",req.body.keyid);

	kafka.make_request('search', req.body, function(err, result){
        console.log('KF In results search');
        console.log('KF results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Course not found in DB");
        }
        else{
            console.log("Course Search Result: "+result);
							if(result) {
								

								console.log(result);	
								console.log(result[0].CourseId);
								console.log(result[0].CourseName);
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							} else {								
								console.log("array empty or does not exist");
								console.log("Course Does not exist");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Course not found in DB");
								
							}
          
        }
    });

    
});







module.exports = app;