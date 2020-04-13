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

    console.log("Inside submitquiz KF Post Request");
	console.log("New Course Req Body : ",req.body);
	console.log("New Course Req CID : ",req.body.cid);
	console.log("New Course Req Student : ",req.body.pname);
	console.log("New Course Req QuizName : ",req.body.QuizName);
	console.log("New Course Req MaxS : ",req.body.maxS);
	console.log("New Course Req MyScore : ",req.body.myScore);
	console.log("New Course Req Taken : ",req.body.taken);
	

	kafka.make_request('submitquiz', req, function(err, result){
        console.log('KF In results');
        console.log('KF Seeing Submitquiz results ', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("QUIZ_SCORE_NOT_ADDED");
        }
        else{
            console.log("Quiz Submit Result: "+result);
							if(result) {
								console.log(result);
								console.log("QUIZ_SCORE_ADDED");
								res.writeHead(200,{'Content-Type' : 'text/plain'})
								res.end("QUIZ_SCORE_ADDED");
							} else {								
								console.log("QUIZ_SCORE_NOT_ADDED");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("QUIZ_SCORE_NOT_ADDED");
								
							}
          
        }
    });






	
    
});





module.exports = app;