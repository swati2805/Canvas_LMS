//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const path = require('path');
var mysql      = require('mysql');
const fileUpload = require('express-fileupload');
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//Passport authentication
var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
const secret = "secret";
//Kafka
var kafka = require('./kafka/client');


// Nodejs encryption with CTR
//const crypto = require('crypto');
app.set('view engine', 'ejs');
const bcrypt = require('bcrypt');
//use cors to allow cross origin resource sharing
//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({ origin: 'http://ec2-3-82-92-68.compute-1.amazonaws.com:3000', credentials: true }));
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));


//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://ec2-3-82-92-68.compute-1.amazonaws.com:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);

var requireAuth = passport.authenticate('jwt', {session: false});





var pool = mysql.createPool({
  connectionLimit: 100,
  host     : '127.0.0.1',
  user     : 'root',
  password : 'admin123',
  database : 'poolnodejs',
});

/*var pool = mysql.createConnection({
	host     : '127.0.0.1',
	user     : 'root',
	password : 'admin123',
});*/

mongo.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.createCollection("customers", function(err, res) {
	  if (err) throw err;
	  console.log("Collection created!");
	  db.close();
	});
});

app.get('/databasecreate', (req,res) => {
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
	
			let sql = 'CREATE DATABASE poolnodejs';
			con.query(sql, (err2, result) => {
				if(err2) throw err2;
				console.log(result);
				res.send('database poolnode js created');
			});				
		}	
	});
});

app.get('/table1create', (req,res) => {
	
pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			var sql = "CREATE TABLE profile_table (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255), last_name VARCHAR(255), email  VARCHAR(255), password  VARCHAR(255), city  VARCHAR(255), gender  VARCHAR(255), phone_number  VARCHAR(255), school VARCHAR(255), hometown VARCHAR(255), company VARCHAR(255), languages VARCHAR(255), country VARCHAR(255), about_me VARCHAR(255), ptype VARCHAR(255))";
				con.query(sql, function (err2, result) {
				if (err2) throw err2;
				console.log("Table created");
				res.send('profile_table table created at poolnodejs database');
            });		
		}	
});
});

app.get('/table1alter', (req,res) => {
	
	pool.getConnection((err1,con) => {
			if(err1){ throw err1;}
			else {
				var sql = "ALTER TABLE profile_table ADD ProfilePic VARCHAR(255)";
					con.query(sql, function (err2, result) {
					if (err2) throw err2;
					console.log("Table altered");
					res.send('profile_table table altered at poolnodejs database');
				});		
			}	
	});
});

app.get('/table2create', (req,res) => {
	
pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			var sql = "CREATE TABLE course_table1 (id INT AUTO_INCREMENT PRIMARY KEY, CourseId VARCHAR(255), CourseName VARCHAR(255), CourseDept  VARCHAR(255), CourseDescription  VARCHAR(255), CourseRoom  VARCHAR(255), CourseCapacity  VARCHAR(255), WaitlistCapacity  VARCHAR(255), CourseTerm VARCHAR(255), Faculty  VARCHAR(255), CurrentSize VARCHAR(255), CurrentWaitlistSize VARCHAR(255))";
				con.query(sql, function (err2, result) {
				if (err2) throw err2;
				console.log("Table created");
				res.send('course_table table created at poolnodejs database');
            });		
		}	
});
});

app.get('/table3create', (req,res) => {
	
pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			var sql = "CREATE TABLE student_course_map (id INT AUTO_INCREMENT PRIMARY KEY, Student VARCHAR(255), CourseId VARCHAR(255), Grade  VARCHAR(255))";
				con.query(sql, function (err2, result) {
				if (err2) throw err2;
				console.log("student_course_map");
				res.send('student_course_map table created at poolnodejs database');
            });		
		}	
		});
});


app.get('/table4create', (req,res) => {
	
			pool.getConnection((err1,con) => {
			if(err1){ throw err1;}
			else {
				var sql = "CREATE TABLE course_assignment_map (id INT AUTO_INCREMENT PRIMARY KEY, CourseId VARCHAR(255), Faculty  VARCHAR(255), AssignName  VARCHAR(255), FileName  VARCHAR(255))";
					con.query(sql, function (err2, result) {
					if (err2) throw err2;
					console.log("course_assignment_map");
					res.send('course_assignment_map table created at poolnodejs database');
				});		
			}	
			});
});
	

app.get('/table5create', (req,res) => {
	
	pool.getConnection((err1,con) => {
	if(err1){ throw err1;}
	else {
		var sql = "CREATE TABLE student_assignment_map (id INT AUTO_INCREMENT PRIMARY KEY, Student  VARCHAR(255), CourseId VARCHAR(255), AssignName  VARCHAR(255), FileName  VARCHAR(255), Grade VARCHAR(255))";
			con.query(sql, function (err2, result) {
			if (err2) throw err2;
			console.log("student_assignment_map");
			res.send('student_assignment_map table created at poolnodejs database');
		});		
	}	
	});
});

app.get('/table6create', (req,res) => {
	
	pool.getConnection((err1,con) => {
	if(err1){ throw err1;}
	else {
		var sql = "CREATE TABLE course_quiz_map1 (id INT AUTO_INCREMENT PRIMARY KEY, CourseId  VARCHAR(255), QuizName VARCHAR(255), QuestionNumber VARCHAR(255),  Question VARCHAR(255), RightA VARCHAR(255), A1 VARCHAR(255), A2 VARCHAR(255), A3 VARCHAR(255))";
			con.query(sql, function (err2, result) {
			if (err2) throw err2;
			console.log("course_quiz_map1");
			res.send('course_quiz_map1 table created at poolnodejs database');
		});		
	}	
	});
});

app.get('/table7create', (req,res) => {
	
	pool.getConnection((err1,con) => {
	if(err1){ throw err1;}
	else {
		var sql = "CREATE TABLE course_ann_map (id INT AUTO_INCREMENT PRIMARY KEY, CourseId VARCHAR(255), AnnTitle VARCHAR(255), AnnContent VARCHAR(255))";
			con.query(sql, function (err2, result) {
			if (err2) throw err2;
			console.log("course_ann_map");
			res.send('course_ann_map table created at poolnodejs database');
		});		
	}	
	});
});


app.get('/table8create', (req,res) => {
	
	pool.getConnection((err1,con) => {
	if(err1){ throw err1;}
	else {
		var sql = "CREATE TABLE course_notes_map (id INT AUTO_INCREMENT PRIMARY KEY, CourseId  VARCHAR(255), NotesName VARCHAR(255), FileName VARCHAR(255))";
			con.query(sql, function (err2, result) {
			if (err2) throw err2;
			console.log("course_notes_map");
			res.send('course_notes_map table created at poolnodejs database');
		});		
	}	
	});
});

app.get('/table9create', (req,res) => {
	
	pool.getConnection((err1,con) => {
	if(err1){ throw err1;}
	else {
		var sql = "CREATE TABLE code_course_map (id INT AUTO_INCREMENT PRIMARY KEY, CourseId  VARCHAR(255), Student VARCHAR(255), Code VARCHAR(255))";
			con.query(sql, function (err2, result) {
			if (err2) throw err2;
			console.log("code_course_map");
			res.send('code_course_map table created at poolnodejs database');
		});		
	}	
	});
});

app.get('/table10create', (req,res) => {
	
	pool.getConnection((err1,con) => {
	if(err1){ throw err1;}
	else {
		var sql = "CREATE TABLE student_quiz_map (id INT AUTO_INCREMENT PRIMARY KEY, CourseId  VARCHAR(255), Student VARCHAR(255), QuizName VARCHAR(255), MaxS VARCHAR(255), MyScore VARCHAR(255), Taken VARCHAR(255))";
			con.query(sql, function (err2, result) {
			if (err2) throw err2;
			console.log("student_quiz_map");
			res.send('student_quiz_map table created at poolnodejs database');
		});		
	}	
	});
});



var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');
var search = require('./routes/search');
var newcourse = require('./routes/newcourse');
var updateprofile = require('./routes/updateprofile');
var profilepage = require('./routes/profilepage');
var products = require('./routes/products');
var home = require('./routes/home');
var homegetinfo = require('./routes/homegetinfo');
var homegetfacluty = require('./routes/homegetfacluty');
var dropcourselist = require('./routes/dropcourselist');
var uploadassign = require('./routes/uploadassign');
var coursegetassign = require('./routes/coursegetassign');
var coursegetassign_for_student = require('./routes/coursegetassign_for_student');
var viewassign = require('./routes/viewassign');
var submitassign = require('./routes/submitassign');
var grade = require('./routes/grade');
var submitgrades = require('./routes/submitgrades');
var addquiz = require('./routes/addquiz');
var uploadnotes = require('./routes/uploadnotes');
var coursegetnotes = require('./routes/coursegetnotes');
var coursegetnotes_for_student = require('./routes/coursegetnotes_for_student');
var addann = require('./routes/addann');
var coursegetann = require('./routes/coursegetann');
var coursegetann_for_student = require('./routes/coursegetann_for_student');
var coursegetdes= require('./routes/coursegetdes');
var coursegetquiz = require('./routes/coursegetquiz');
var quizview = require('./routes/quizview');
var viewppl = require('./routes/viewppl');
var addcourse_waitlist = require('./routes/addcourse_waitlist');
var dropcourse_waitlist = require('./routes/dropcourse_waitlist');
var submitquiz = require('./routes/submitquiz');
var coursegetquiztaken = require('./routes/coursegetquiztaken');
var sendmessages = require('./routes/sendmessages');
var getmessages = require('./routes/getmessages');
var addcode = require('./routes/addcode');
var codecheck = require('./routes/codecheck');
var addcourse_withcode = require('./routes/addcourse_withcode');

app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/newcourse', newcourse);
app.use('/search', search);
app.use('/updateprofile', updateprofile);
app.use('/profilepage', profilepage);
app.use('/products', products);
app.use('/dropcourselist', dropcourselist);
app.use('/home', home);
app.use('/homegetfacluty', homegetfacluty);
app.use('/homegetinfo', homegetinfo);
app.use('/uploadassign', uploadassign);
app.use('/coursegetassign_for_student', coursegetassign_for_student);
app.use('/coursegetassign', coursegetassign);
app.use('/viewassign', viewassign);
app.use('/submitassign', submitassign);
app.use('/grade', grade);
app.use('/submitgrades', submitgrades);
app.use('/addquiz', addquiz);
app.use('/uploadnotes', uploadnotes);
app.use('/coursegetnotes', coursegetnotes);
app.use('/coursegetnotes_for_student', coursegetnotes_for_student);
app.use('/addann', addann);
app.use('/coursegetann', coursegetann);
app.use('/coursegetann_for_student', coursegetann_for_student);
app.use('/coursegetdes', coursegetdes);
app.use('/coursegetquiz', coursegetquiz);
app.use('/quizview', quizview);
app.use('/viewppl', viewppl);
app.use('/addcourse_waitlist', addcourse_waitlist);
app.use('/dropcourse_waitlist', dropcourse_waitlist);
app.use('/submitquiz', submitquiz);
app.use('/coursegetquiztaken', coursegetquiztaken);
app.use('/sendmessages', sendmessages);
app.use('/getmessages', getmessages);
app.use('/addcode', addcode);
app.use('/codecheck', codecheck);
app.use('/addcourse_withcode', addcourse_withcode);


app.post('/getpic',function(req,res){

    console.log("Inside getpic Post Request");
	console.log("Req Body : ",req.body);
	console.log("Student Name : "+req.body.pname);
	
    mongo.connect(url, (err1,con) => {
        if(err1){ throw err1;}
        else {
            
            var dbo = con.db("mydb");
            var sql = "SELECT * FROM pic_table WHERE first_name = " +req.body.pname;
            console.log(sql);
            dbo.collection("pic_table").find({first_name : req.body.pname}).toArray(function(err2, result) {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No profiles created Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_Profiles_entered_YET");
							} else {								
								
								console.log(result);	
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

											
				}
			});				
		}	
	});		

    
});

//Route to handle Post Request Call
app.post('/setpic',function(req,res){

    console.log("Inside setpic Post Request");
    console.log("setpic Req Body : ",req.body.first_name);

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
		} else {
		//else starts

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        else {

            console.log("inside insert into pic table");
          
            var dbo = db.db("mydb");

               
                    var myobj = {
                        first_name: req.body.first_name,
                        ProfilePic : fileName
                    };
                    dbo.collection("pic_table").insertOne(myobj, function (err2,result) {
					if(err2) {
						throw err2;
						console.log("Pic Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("Pic Counldn't be Added");
					}else {
							console.log("Pic Added Successfully!!!!");
							res.writeHead(200,{'Content-Type' : 'text/plain'})
							res.end("Pic Added Successfully!!!");
					}
				});	
				
			 
				
            		
		}	
	});	



		}//else ends

	})





    
});



module.exports = app;
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

