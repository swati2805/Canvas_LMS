const bcrypt = require('bcrypt');
var mongo = require('mongodb').MongoClient;
var url =  "mongodb://localhost:27017/";

function handle_request(req, callback){
    console.log('Inside Kafka Backend Signup');
    console.log('Message: ', req.body);

    //Check if user exists

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        else {

            console.log("inside insert into profiles table");
            console.log("Password : ", req.body.password);
            var dbo = db.db("mydb");

            bcrypt.hash(req.body.password, 10, function (err3, encrypted_password) {
                if (err3) throw err3;
                else {
                    console.log(encrypted_password);
                    var myobj = {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: encrypted_password,
                        city: req.body.city,
                        gender: req.body.gender,
                        phone_number: req.body.phone_number,
                        school: req.body.school,
                        hometown: req.body.hometown,
                        company: req.body.company,
                        languages: req.body.languages,
                        country: req.body.country,
                        about_me: req.body.about_me,
                        profile_pic : '',
                        ptype: req.body.ptype
                    };
                    dbo.collection("profiles").insertOne(myobj, function (err2,result) {
                        if (err2) {
                            throw err2;
                            console.log("User Counldn't be Added!!!!");
                            callback(null, null); 
                        } else {
                            console.log("User Added Successfully!!!!");
                            callback(null, {msg : "KB says user signp was success"}); 
                        }
                        //db.close();
                    });

                }

            });
        }
    });

}

exports.handle_request = handle_request;