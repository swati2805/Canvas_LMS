
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

//Route to handle Post Request Call
app.post('/',function(req,res){

    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);    


    kafka.make_request('login', req.body, function(err, result){
        console.log('KF In results login');
        console.log('KF results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in login!');
        }
        else{
            console.log('KF Inside results Login');
            if(result){
                console.log("KF: password checking successfull: ", result);
                //res.cookie('cookie',result.first_name,{maxAge: 900000, httpOnly: false, path : '/'});
                //req.session.user = result.first_name;
                //res.writeHead(200,{'Content-Type' : 'text/plain'});
                //res.end("Login Successfully!!!");   

                                console.log("Getting Token with: "+JSON.stringify(result))

                                req.session.user = result.first_name;

                                // Create token if the password matched and no error was thrown
                                var token = jwt.sign(result, secret, {
                                    expiresIn: 10080 // in seconds
                                });
                
                            
                                
                                //res.status(200).json({success: true, Authorization: 'Bearer ' + token});
                                var Result = {
                                    pname : result.first_name,
                                    ptype : result.ptype,
                                    Token : token
                                }
                
                                res.writeHead(200,{'Content-Type' : 'application/json'});
                                res.end(JSON.stringify(Result));


            }
            else{
                console.log("KF: Login Failed!!!! Password Or Username is incorrect");
                res.writeHead(400,{'Content-Type' : 'text/plain'});
                res.end("Login Failed");
            }            
        }
    });



    
});


module.exports = app;