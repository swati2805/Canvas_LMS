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

    console.log("Inside uploadnotes Post Request");
	//console.log("Req Body : ",req.body);
	console.log("Req Body files: ",req.files.file);
	console.log("Req Body file Name: ",req.files.file.name);
	console.log("Req Body User Name: ",req.body.userid);
	console.log("Req Body Course Name: ",req.body.cid);
	console.log("Req Body Notes Name: ",req.body.AssignName);

	let uploadFile = req.files.file;
	const fileName = req.files.file.name;
	uploadFile.mv(
	  `${__dirname}/../uploads/notes/${fileName}`,
	  function (err) {
		if (err) {
		  throw err;
		  console.log("Upload Failed");
		  res.writeHead(400,{'Content-Type' : 'text/plain'});
		  res.end("Upload Failed");
		} else {
		//else starts


	kafka.make_request('uploadnotes', req, function(err, result){
        console.log('KF In results search');
        console.log('KF results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Course not found in DB");
        }
        else{
            console.log("KF Notes Upload Result: "+result);
							if(result) {
								

								console.log(result);
								console.log("Sending Response File Path Uploaded: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							} else {								
								console.log("Upload Failed");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Upload Failed");
								
							}
          
        }
    });



		}//else ends

	})
	
});





module.exports = app;