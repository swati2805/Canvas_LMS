'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const secret = "secret";

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {

        mongo.connect(url, (err1, con) => {
            if (err1) { throw err1; }
            else {

                console.log("inside passport authentication page with first name: " + jwt_payload.first_name);
                var dbo = con.db("mydb");
                var myquery = { first_name: jwt_payload.first_name };


                console.log("MONGO Query: " + JSON.stringify(myquery));
                dbo.collection("profiles").find(myquery).toArray(function (err2, result) {
                    if (err2) {
                        throw err2;
                    } else {
                        console.log(result);
                        if (result) {
                            console.log(result[0].CourseName);
                            console.log("JWT Sending Response: " + JSON.stringify(result));
                            var user = result[0];
                            delete user.password;
                            callback(null, user);
                        } else {
                            callback(err, false);
                        }

                    }
                    dbo.close();
                });
            }
        });
    }));
};
