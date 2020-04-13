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
	//console.log("Req Body : ",req.body);
	console.log("Req Body CID: ",req.body.cid);
	console.log("Req Body QuizName: ",req.body.quizname);
	console.log("Req Body QuesionNum : ",req.body.qcount);
	console.log("Req Body Question : ",req.body.question);
	console.log("Req Body Right_A: ",req.body.right_a);
	console.log("Req Body A1: ",req.body.a1);
	console.log("Req Body A2: ",req.body.a2);
	console.log("Req Body A3: ",req.body.a3);

	kafka.make_request('addquiz', req, function(err, result){
        console.log('KF addquiz');
        console.log('KF addquiz results', result);
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
								res.end("Q_ADD_Successfull");
							} else {								
								console.log("Q ADD Failed");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Q ADD Failed");
								
							}
          
        }
    });


	
});




module.exports = app;