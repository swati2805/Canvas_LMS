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

app.post('/', function (req, res) {

	console.log("Inside signup Post Request");
	console.log("Signup Req Body : ", req.body);

	/*let uploadFile = req.files.file;
	const fileName = req.files.file.name;
	uploadFile.mv(
	  `${__dirname}/uploads/profilepics/${fileName}`,
	  function (err) {
		if (err) {
		  throw err;
		  console.log("Upload Failed");
		  res.writeHead(400,{'Content-Type' : 'text/plain'});
		  res.end("Upload Failed");
		} else {
		//else starts

		}//else ends

	})*/

	kafka.make_request('signup', req, function(err, result){
        console.log('KF In results signup');
        console.log('KF results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('NOT ABLE TO SIGNUP');
        }
        else{
            console.log('KF Inside results Signup');
            if(result){
                            console.log(result.msg);
							res.writeHead(200, { 'Content-Type': 'text/plain' })
							res.end("User Added Successfully!!!");  
            }
            else{
                console.log("User Counldn't be Added!!!!");
							res.writeHead(400, { 'Content-Type': 'text/plain' });
							res.end("User Counldn't be Added");
            }            
        }
    });




});






module.exports = app;