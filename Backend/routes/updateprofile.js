//Login.js - Login route module
var express = require('express');
var app = express.Router();
//Kafka
var kafka = require('../kafka/client');
const bcrypt = require('bcrypt');
//Passport authentication
const path = require('path');
var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
const secret = "secret";
var url = "mongodb://localhost:27017/";
var mongo = require('mongodb').MongoClient;


app.post('/',function(req,res){

    console.log("KF Inside Update Profile Post Request");
	console.log("Signup Req Body : ",req.body);
	
    if(req.body.isFile === 'FILE') {
		let uploadFile = req.files.file;
		const fileName = req.files.file.name;
		uploadFile.mv(
	  		`${__dirname}/uploads/profilepics/${fileName}`,
	  			function (err) {
					if (err) {
		  				throw err;
		  				console.log("Upload Failed");
		  				res.writeHead(400,{'Content-Type' : 'text/plain'});
		  				res.end("Upload Failed");
					} 

				})
	} 
   

	kafka.make_request('updateprofile', req, function(err, result){
     
        
        if(err){
            console.log("User Counldn't be Updated!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Updated");
        }
        else{
            
							if(result) {
								

								console.log(result);
								console.log("User Updated Successfully!!!!");
								res.writeHead(200,{'Content-Type' : 'text/plain'})
								res.end("User Updated Successfully!!!");
							} else {								
								console.log("User Counldn't be Updated!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Updated");
							}
          
        }
    });




    
});








module.exports = app;