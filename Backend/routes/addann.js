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

    console.log("Inside addquiz Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CID: ",req.body.cid);
	console.log("Req Body annTitle: ",req.body.annTitle);
	console.log("Req Body annContent : ",req.body.annContent);


	kafka.make_request('addann', req, function(err, result){
        console.log('KF addann');
        console.log('KF addann results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Q ADD Failed");
        }
        else{
            console.log("ADD QUIZ Result: "+result);
							if(result) {
								console.log(result);
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end("ANN_ADD_Successfull");
							} else {								
								console.log("NO_ANN_YET");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_ANN_YET");
								
							}
          
        }
    });




	
});



module.exports = app;