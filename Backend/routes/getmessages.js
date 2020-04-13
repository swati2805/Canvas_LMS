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

    console.log("KF Inside getmessages Get Request");
    console.log("KF getmessages Req Body : ",req.body);
	
	
	kafka.make_request('getmessages', req, function(err, result){
        
        console.log('KF results', result);
        if(err){
            					console.log("NO_MESSAGES_YET");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_MESSAGES_YET");
        }
        else{
            console.log("KF get messages Result: "+result);
							if(result) {
								//console.log(result);	
								console.log("KF Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							} else {								
								console.log("array empty or does not exist");
								console.log("NO_MESSAGES_YET");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_MESSAGES_YET");
								
							}
          
        }
    });



	

    
});




module.exports = app;