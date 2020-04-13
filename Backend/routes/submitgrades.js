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

    console.log("Inside submitgrades Post Request Kafka Frontend");
	console.log("Req Body : ",req.body);
	console.log("Req Body User Name: ",req.body.pname);
	console.log("Req Body Grades : ",req.body.grade);
	console.log("Req Body Assign Name: ",req.body.AssignName);
	console.log("Req Body Course Name: ",req.body.cid);


	kafka.make_request('submitgrades', req, function(err, result){
        //console.log('KF In results search');
        console.log('KF results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Course not found in DB");
        }
        else{
            console.log("Course Search Result: "+result);
							if(result) {
								
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(result.msg);
							} else {								
								console.log("Grades Upload Failed");
						
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Grades Upload Failed");
								
							}
          
        }
    });


	
});






module.exports = app;