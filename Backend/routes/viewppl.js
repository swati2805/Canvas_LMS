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

    console.log("Inside viewppl Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	

	kafka.make_request('viewppl', req.body, function(err, result){
        console.log('KF In results search');
        console.log('KF results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400,{'Content-Type' : 'text/plain'});
			res.end("NO_STUDENTS_YET");
        }
        else{
            console.log("KAFKA Viewppl Search Result: "+result);
							if(result) {
								

								console.log(result);	
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							} else {								
								console.log("array empty or does not exist");
								console.log("No Students Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_STUDENTS_YET");
								
							}
          
        }
    });
	

    
});





module.exports = app;