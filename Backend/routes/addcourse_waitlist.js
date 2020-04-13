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

    console.log("Inside addcourse_waitlist Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CID: ",req.body.cid);
	console.log("Req Body Pname: ",req.body.pname);


    kafka.make_request("addcourse", req.body, function(err, result){
            if(err){
                console.log("KF ADD Course Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end("User Counldn't be Added");
            }
            else{
                console.log('KF USER ADDED ', result.msg);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end("User Added Successfully!!!");
            }
        });        
});




module.exports = app;