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

    console.log("Inside sendmessages KF Post Request");
    console.log("KF sendmessages Req Body : ",req.body);


	kafka.make_request('sendmessages', req, function(err, result){
        
        console.log('KF results', result);
        if(err){
            					console.log("KF: Course Counldn't be Added!!!!");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Message Counldn't be Added");
        }
        else{
            console.log("KF send messages Result: "+result);
							if(result) {
								
								console.log("KF: Message Added Successfully!!!!");
								res.writeHead(200,{'Content-Type' : 'text/plain'})
								res.end("Message Added Successfully!!!");
							} else {								
								console.log("KF: Course Counldn't be Added!!!!");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Message Counldn't be Added");
								
							}
          
        }
    });




	
	
    
});




module.exports = app;