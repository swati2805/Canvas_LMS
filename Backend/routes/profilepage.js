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

    console.log("Inside profilepage Post Request");
	console.log("Req Body : ",req.body);
	console.log("Student Name : "+req.body.pname);



    if (req.session.user) {
        console.log(req.session.user);

        kafka.make_request("profilepage", req, function(err, result){
            if(err){
                console.log("KB Unable to fetch user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('NO_Profiles_entered_YET');
            }
            else{
                console.log('KB Profile Data: ', result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });        
    }

    
});






module.exports = app;