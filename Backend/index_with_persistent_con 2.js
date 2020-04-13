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
// Nodejs encryption with CTR
//const crypto = require('crypto');
app.set('view engine', 'ejs');
const bcrypt = require('bcrypt');
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });







/*var pool = mysql.createPool({
  connectionLimit: 100,
  host     : '127.0.0.1',
  user     : 'root',
  password : 'admin123',
  database : 'poolnodejs',
});*/

var con = mysql.createConnection({
	host     : '127.0.0.1',
	user     : 'root',
	password : 'admin123',
	database : 'poolnodejs',
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


//Route to handle Post Request Call
app.post('/signup',function(req,res){

    console.log("Inside signup Post Request");
    console.log("Signup Req Body : ",req.body);

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

	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside insert into profiles table");
			console.log("Password : ", req.body.password);
			
			bcrypt.hash(req.body.password, 10, function(err3, encrypted_password) {
			  if(err3) throw err3;
			  else 
			  {
					console.log(encrypted_password);
				
				var sql = "INSERT INTO profile_table  (first_name,last_name,email,password,city,gender,phone_number,school,hometown,company,languages,country,about_me,ptype,ProfilePic) VALUES ( " +mysql.escape(req.body.first_name)+" ,"+mysql.escape(req.body.last_name)+" ,"+mysql.escape(req.body.email)+" ,"+mysql.escape(encrypted_password)+" ,"+mysql.escape(req.body.city)+" ,"+mysql.escape(req.body.gender)+" ,"+mysql.escape(req.body.phone_number)+" ,"+mysql.escape(req.body.school)+" ,"+mysql.escape(req.body.hometown)+" ,"+mysql.escape(req.body.company)+" ,"+mysql.escape(req.body.languages)+" ,"+mysql.escape(req.body.country)+" ,"+mysql.escape(req.body.about_me)+" ,"+mysql.escape(req.body.ptype)+" ,"+mysql.escape(req.files.file.name)+ " )";
				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("User Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Added");
					}else {
							console.log("User Added Successfully!!!!");
							res.writeHead(200,{'Content-Type' : 'text/plain'})
							res.end("User Added Successfully!!!");
					}
				});	
				
			  }	
				
            });				
		}	
	});	



		}//else ends

	})





    
});



app.post('/updateprofile',function(req,res){

    console.log("Inside Update Profile Post Request");
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
   


	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside insert into profiles table");
			console.log("Password : ", req.body.password);
			
			bcrypt.hash(req.body.password, 10, function(err3, encrypted_password) {
			  if(err3) throw err3;
			  else 
			  {

				var sql = null;
				if(req.body.isFile === 'FILE') {
					sql = "UPDATE profile_table SET last_name="+mysql.escape(req.body.last_name)+",email="+mysql.escape(req.body.email)+",password="+mysql.escape(encrypted_password)+",city="+mysql.escape(req.body.city)+",gender="+mysql.escape(req.body.gender)+",phone_number="+mysql.escape(req.body.phone_number)+",school="+mysql.escape(req.body.school)+",hometown="+mysql.escape(req.body.hometown)+",company="+mysql.escape(req.body.company)+",languages="+mysql.escape(req.body.languages)+",country="+mysql.escape(req.body.country)+",about_me="+mysql.escape(req.body.about_me)+",ProfilePic="+mysql.escape(req.files.file.name)+" WHERE first_name="+mysql.escape(req.body.first_name);
				} else {
					sql = "UPDATE profile_table SET last_name="+mysql.escape(req.body.last_name)+",email="+mysql.escape(req.body.email)+",password="+mysql.escape(encrypted_password)+",city="+mysql.escape(req.body.city)+",gender="+mysql.escape(req.body.gender)+",phone_number="+mysql.escape(req.body.phone_number)+",school="+mysql.escape(req.body.school)+",hometown="+mysql.escape(req.body.hometown)+",company="+mysql.escape(req.body.company)+",languages="+mysql.escape(req.body.languages)+",country="+mysql.escape(req.body.country)+",about_me="+mysql.escape(req.body.about_me)+" WHERE first_name="+mysql.escape(req.body.first_name);
				}
				console.log(encrypted_password);
				console.log(sql);
				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("User Counldn't be Updated!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Updated");
					}else {
							console.log("User Updated Successfully!!!!");
							res.writeHead(200,{'Content-Type' : 'text/plain'})
							res.end("User Updated Successfully!!!");
					}
				});	
				
			  }	
				
            });				
		}	
	});	







    
});


//Route to handle Post Request Call
app.post('/addcourse',function(req,res){

    console.log("Inside addcourse Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CID: ",req.body.cid);
	console.log("Req Body Pname: ",req.body.pname);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside student_course_map table");

				var sql = "INSERT INTO student_course_map (Student, CourseId) VALUES ( " +mysql.escape(req.body.pname)+" ,"+mysql.escape(req.body.cid)+ " )";
				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("User Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Added");
					}else {

						///// Next Query /////////////////////////
						pool.getConnection((err1_next,con_next) => {
							if(err1_next){ throw err1_next;}
							else {
								
								console.log("inside increment current capacity in courses table");
					
									var sql_next = "UPDATE course_table1 SET CurrentSize=CurrentSize+1 WHERE CourseId = "+mysql.escape(req.body.cid);
									console.log(sql_next);
									con_next.query(sql_next, (err2_next, result_next) => {
										if(err2_next) {
											throw err2_next;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}else {
												console.log("User Added Successfully!!!!");
												res.writeHead(200,{'Content-Type' : 'text/plain'})
												res.end("User Added Successfully!!!");
										}
									});	
							
							}	
						});	
						///// Next Query Ends /////////////////////	
					}
				});	
		
		}	
	});	
    
});




//Route to handle Post Request Call
app.post('/newcourse',function(req,res){

    console.log("Inside add newcourse Post Request");
    console.log("New Course Req Body : ",req.body);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside insert into course table");

				var sql = "INSERT INTO course_table1  (CourseId, CourseName, CourseDept, CourseDescription, CourseRoom, CourseCapacity, WaitlistCapacity, CourseTerm, Faculty, CurrentSize, CurrentWaitlistSize) VALUES ( " +mysql.escape(req.body.CourseId)+" ,"+mysql.escape(req.body.CourseName)+" ,"+mysql.escape(req.body.CourseDept)+" ,"+mysql.escape(req.body.CourseDescription)+" ,"+mysql.escape(req.body.CourseRoom)+" ,"+mysql.escape(req.body.CourseCapacity)+" ,"+mysql.escape(req.body.WaitlistCapacity)+" ,"+mysql.escape(req.body.CourseTerm)+" ,"+mysql.escape(req.body.Faculty)+" ,0,0)";

				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("Course Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Added");
					}else {
							console.log("New Course Added Successfully!!!!");
							res.writeHead(200,{'Content-Type' : 'text/plain'})
							res.end("User Added Successfully!!!");
					}
				});	
				
			
		}	
	});	
	
	
    
});


//Route to handle Post Request Call
app.post('/login',function(req,res){

    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
	

			
			console.log("inside login password checking");
			//var encrypted_password = encrypt(req.body.password);
			console.log("Incoming Password : ", req.body.password);
			//console.log("Encrypted Password : ", encrypted_password);
			//var sql = "INSERT INTO profiles  (first_name,last_name,email,password,city,gender,phone_number,school,hometown,company,languages,country,about_me) VALUES ( " +mysql.escape(req.body.first_name)+" ,"+mysql.escape(req.body.last_name)+" ,"+mysql.escape(req.body.email)+" ,"+mysql.escape(encrypted_password)+" ,"+mysql.escape(req.body.city)+" ,"+mysql.escape(req.body.gender)+" ,"+mysql.escape(req.body.phone_number)+" ,"+mysql.escape(req.body.school)+" ,"+mysql.escape(req.body.hometown)+" ,"+mysql.escape(req.body.company)+" ,"+mysql.escape(req.body.languages)+" ,"+mysql.escape(req.body.country)+" ,"+mysql.escape(req.body.about_me)+ " )";
            var sql = "SELECT first_name, password FROM profile_table WHERE first_name = "+mysql.escape(req.body.username);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("User Counldn't be Added");
				}else {
							console.log("Login User Found in Database!!!!");
							console.log(result);
							console.log(result[0].first_name);
							console.log(result[0].password);
							//var temp = { iv: my_iv, encryptedData: result[0].password };
							//var decrypted_password = decrypt(temp);
							//console.log("decrypted_password: "+decrypted_password);
							bcrypt.compare(req.body.password, result[0].password, function(err3, match) {
							if(err3) throw err3;	
							if(match)
							{	console.log("password checking successfull");
							    res.cookie('cookie',result[0].first_name,{maxAge: 900000, httpOnly: false, path : '/'});
								req.session.user = result[0].first_name;
								res.writeHead(200,{'Content-Type' : 'text/plain'});
								res.end("User Added Successfully!!!");
							} else {
							    console.log("Login Failed!!!! Password Or Username is incorrect");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Login Failed");
							}
							});

							
				}
			});				

    
});


app.post('/search',function(req,res){

    console.log("Inside Search Post Request");
    console.log("Req Body : ",req.body);
	console.log("Req Body Key : ",req.body.keyid);
	

			console.log("Incoming KeyId : ", req.body.keyid);
            var sql = "SELECT * FROM course_table1 WHERE CourseId LIKE "+mysql.escape("".concat("%",req.body.keyid, "%"));
			console.log("SELECT QUERY is: "+sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("Course Does not exist");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Course not found in DB");
							} else {								
								
								console.log(result);	
								console.log(result[0].CourseId);
								console.log(result[0].CourseName);
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

													
				}
			});				

    
});


app.get('/products',function(req,res){

    console.log("Inside Products Get Request");
    console.log("Req Body : ",req.body);
	
	


			
            var sql = "SELECT * FROM course_table1";
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Course Exist Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("No Course Exist Yet");
							} else {								
								
								console.log(result);	
								console.log(result[0].CourseId);
								console.log(result[0].CourseName);
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

													
				}
			});				
	

    
});


app.post('/dropcourselist',function(req,res){

    console.log("Inside dropcourselist post Request");
    console.log("Req Body : ",req.body);
	
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {

			console.log("Incoming Pname : ", req.body.pname);
            var sql = "SELECT DISTINCT CourseId FROM student_course_map WHERE Student = "+mysql.escape(req.body.pname);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Course Exist Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("No Course Exist Yet");
							} else {								
								
								console.log(result);	
								console.log(result[0].CourseId);
								console.log(result[0].CourseName);
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

													
				}
			});				
		}	
	});		

    
});


app.post('/dropcourse',function(req,res){
	
	console.log("Inside Drop Course Delete Request");
	console.log("Course to be deleted: "+req.body.cid);
	console.log("Course to be deleted for student: "+req.body.pname);

	 pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
            var sql = "DELETE FROM student_course_map WHERE Student = "+mysql.escape(req.body.pname)+" AND CourseId = "+mysql.escape(req.body.cid);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {

						///// Next Query /////////////////////////
						pool.getConnection((err1_next,con_next) => {
							if(err1_next){ throw err1_next;}
							else {
								
								console.log("inside deccrement current capacity in courses table");
					
									var sql_next = "UPDATE course_table1 SET CurrentSize=CurrentSize-1 WHERE CourseId = "+mysql.escape(req.body.cid);
									console.log(sql_next);
									con_next.query(sql_next, (err2_next, result_next) => {
										if(err2_next) {
											throw err2_next;
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("Query Failed: "+sql_next);
										}else {
											res.writeHead(200,{'Content-Type' : 'application/json'});
											res.end("Delection Successfull");
										}
									});	
							
							}	
						});	
						///// Next Query Ends /////////////////////	
				

													
				}
			});				
		}	
	});	
	
});

//Route to get all course details when user visits the Home Page
app.post('/home', function(req,res){
    console.log("Inside Home Post");
	console.log(req.body);
    console.log(req.body.pname); 

	 	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {

			console.log("Incoming Pname : ", req.body.pname);
			console.log("Incoming Ptype : ", req.body.ptype);
            var sql = "SELECT CourseId FROM student_course_map WHERE Student = "+mysql.escape(req.body.pname);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("User Not Found in student-course map");
				}else {     
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("No Courses registered for student yet");
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end("NO_COURSE_YET");

							} else {

					/////////////////////////// NEXT QUERY STARTS /////////////////////////////////////////////////////			
								console.log("Courses found in Database!!!!");
								console.log(result);
								console.log("STARTING NEXT QUERY")

								pool.getConnection((err1_next,con_next) => {
									if(err1_next){ throw err1_next;}
									else {
										
										var tempStr = "";
										result.forEach(function(c) {
											tempStr += mysql.escape(c.CourseId)+",";
										  });
										console.log(tempStr);
										var sql_next = "SELECT CourseId, CourseName, Faculty, CourseTerm FROM course_table1 WHERE CourseId IN ("+tempStr+"'rags')";
										console.log("Next SLQ: "+sql_next); 
										console.log("Sending next query with results");
									
										con_next.query(sql_next, (err2_next, result_next, fields_next) => {
											if(err2_next) {
												 throw err2_next;
												 
												 res.writeHead(400,{'Content-Type' : 'text/plain'});
												 res.end("Course Not found in courses table");
											}else {     
														console.log(result_next);
														if(result_next === undefined || result_next.length == 0) {
															console.log("Course Not found in courses table");
															res.writeHead(400,{'Content-Type' : 'text/plain'});
															 res.end("Course Not found in courses table");
							
														} else {
															console.log("Courses found in Database!!!!");
															console.log(result_next);
							
																res.writeHead(200,{
																		'Content-Type' : 'application/json'
																});
																res.end(JSON.stringify(result_next));
							
														}
							
							
														
											}
										});				
									}	
								});	

                           ////////////// NEXT QUERY ENDS //////////////////////////////////

							}


							
				}
			});				
		}	
	});	
	


	
	
	
	
    
})


app.post('/homegetinfo',function(req,res){

    console.log("Inside homegetinfo Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body Pname: ",req.body.pname);
	

				var sql = "SELECT DISTINCT ptype FROM profile_table WHERE first_name =" +mysql.escape(req.body.pname);
				console.log(sql);
				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("Query Failed");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("Query Failed");
					}else {

						console.log(result);
						if(result === undefined || result.length == 0) {
							console.log("array empty or does not exist");
							console.log("User Not Found in profiles table");
							res.writeHead(400,{'Content-Type' : 'text/plain'});
							res.end("User Not Found in profiles table");
						} else {								
							
							console.log(result);	
							console.log(result[0].ptype);
							console.log("Sending Response PTYPE: "+JSON.stringify(result));
							res.writeHead(200,{'Content-Type' : 'application/json'});
							res.end(JSON.stringify(result));
						}

					}
				});	
		

});


app.post('/homegetfacluty',function(req,res){

    console.log("Inside homegetfacluty Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body Pname: ",req.body.pname);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {

				var sql = "SELECT CourseId, CourseName, Faculty, CourseTerm FROM course_table1 WHERE Faculty =" +mysql.escape(req.body.pname);
				console.log(sql);
				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("Query Failed");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("Query Failed");
					}else {

						console.log(result);
						if(result === undefined || result.length == 0) {
							console.log("array empty or does not exist");
							console.log("NO_COURSE_YET");
							res.writeHead(200,{'Content-Type' : 'text/plain'});
							res.end("NO_COURSE_YET");
						} else {								
							
							console.log(result);	
							console.log(result[0].ptype);
							console.log("Sending Response PTYPE: "+JSON.stringify(result));
							res.writeHead(200,{'Content-Type' : 'application/json'});
							res.end(JSON.stringify(result));
						}

					}
				});	
		
		}	
	});	
    
});


app.post('/uploadassign',function(req,res){

    console.log("Inside uploadassign Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body files: ",req.files.file);
	console.log("Req Body file Name: ",req.files.file.name);
	console.log("Req Body User Name: ",req.body.userid);
	console.log("Req Body Course Name: ",req.body.cid);
	console.log("Req Body Assign Name: ",req.body.AssignName);

	let uploadFile = req.files.file;
	const fileName = req.files.file.name;
	uploadFile.mv(
	  `${__dirname}/uploads/assignments/${fileName}`,
	  function (err) {
		if (err) {
		  throw err;
		  console.log("Upload Failed");
		  res.writeHead(400,{'Content-Type' : 'text/plain'});
		  res.end("Upload Failed");
		} else {
		//else starts

			pool.getConnection((err1,con) => {
				if(err1){ throw err1;}
				else {
					
					console.log("inside insert into course_assign_map table");
		
						var sql = "INSERT INTO course_assignment_map (CourseId, Faculty, AssignName, FileName) VALUES ( " +mysql.escape(req.body.cid)+" ,"+mysql.escape(req.body.userid)+" ,"+mysql.escape(req.body.AssignName)+" ,"+mysql.escape(req.files.file.name)+" )";
		                console.log(sql);
						con.query(sql, (err2, result) => {
							if(err2) {
								throw err2;
								console.log("Upload Failed");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Upload Failed");
							}else {
								
								var filePath = {
									file: `uploads/assignments/${req.files.file.name}`,
								};  
								console.log("Sending Response File Path Uploaded: "+JSON.stringify(filePath));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(filePath));
							}
						});	
						
					
				}	
			});	

		}//else ends

	})
	
});


app.post('/coursegetassign',function(req,res){

    console.log("Inside coursegetassign Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	console.log("Course Assignments for Faculty: "+req.body.pname);
	
	


			var sql = "SELECT DISTINCT  CourseId, Faculty, AssignName, FileName FROM course_assignment_map WHERE Faculty =" +mysql.escape(req.body.pname)+" AND CourseId = " +mysql.escape(req.body.cid);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Assignments Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_ASSIGNMENTS_YET");
							} else {								
								
								console.log(result);	
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

													
				}
			});				


    
});


app.post('/coursegetassign_for_student',function(req,res){

    console.log("Inside coursegetassign_for_student Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);

	
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {

			var sql = "SELECT DISTINCT  CourseId, Faculty, AssignName, FileName FROM course_assignment_map WHERE CourseId = " +mysql.escape(req.body.cid);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Assignments Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_ASSIGNMENTS_YET");
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


app.post('/viewassign',function(req,res){

    console.log("Inside viewa Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	console.log("Student Name : "+req.body.pname);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {

			var sql = "SELECT DISTINCT AssignName, FileName, Grade FROM student_assignment_map WHERE CourseId = " +mysql.escape(req.body.cid)+" AND Student = " +mysql.escape(req.body.pname);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Assignments Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_ASSIGNMENTS_YET");
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



app.post('/submitassign',function(req,res){

    console.log("Inside submitassign Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body files: ",req.files.file);
	console.log("Req Body file Name: ",req.files.file.name);
	console.log("Req Body User Name: ",req.body.userid);
	console.log("Req Body Course Name: ",req.body.cid);
	console.log("Req Body Assign Name: ",req.body.AssignName);

	let uploadFile = req.files.file;
	const fileName = req.files.file.name;
	uploadFile.mv(
	  `${__dirname}/uploads/assignments/${fileName}`,
	  function (err) {
		if (err) {
		  throw err;
		  console.log("Upload Failed");
		  res.writeHead(400,{'Content-Type' : 'text/plain'});
		  res.end("Upload Failed");
		} else {
		//else starts

			pool.getConnection((err1,con) => {
				if(err1){ throw err1;}
				else {
					
					console.log("inside insert into course_assign_map table");
		
						var sql = "INSERT INTO student_assignment_map (Student, CourseId, AssignName, FileName, Grade) VALUES ( " +mysql.escape(req.body.userid)+" ,"+mysql.escape(req.body.cid)+" ,"+mysql.escape(req.body.AssignName)+" ,"+mysql.escape(req.files.file.name)+",0 )";
		                console.log(sql);
						con.query(sql, (err2, result) => {
							if(err2) {
								throw err2;
								console.log("Upload Failed");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Upload Failed");
							}else {
								
								var filePath = {
									file: `uploads/assignments/${req.files.file.name}`,
								};  
								console.log("Sending Response File Path Uploaded: "+JSON.stringify(filePath));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(filePath));
							}
						});	
						
					
				}	
			});	

		}//else ends

	})
	
});


app.post('/grade',function(req,res){

    console.log("Inside Grade Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	console.log("AssignName : "+req.body.AssignName);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {

			var sql = "SELECT DISTINCT Student, FileName FROM student_assignment_map WHERE CourseId = " +mysql.escape(req.body.cid)+" AND AssignName = " +mysql.escape(req.body.AssignName);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Assignments Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_ASSIGNMENTS_YET");
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



app.post('/submitgrades',function(req,res){

    console.log("Inside submitgrades Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body User Name: ",req.body.pname);
	console.log("Req Body Grades : ",req.body.grade);
	console.log("Req Body Assign Name: ",req.body.AssignName);
	console.log("Req Body Course Name: ",req.body.cid);

			pool.getConnection((err1,con) => {
				if(err1){ throw err1;}
				else {
					
					console.log("inside insert into student_assignment_map table");
		
						var sql = "UPDATE student_assignment_map SET Grade = "+mysql.escape(req.body.grade)+" WHERE CourseId = " +mysql.escape(req.body.cid)+" AND AssignName = " +mysql.escape(req.body.AssignName)+" AND Student = " +mysql.escape(req.body.pname);
		                console.log(sql);
						con.query(sql, (err2, result) => {
							if(err2) {
								throw err2;
								console.log("Upload Failed");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Upload Failed");
							}else {
							
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end("Grade_Submission_Successfull");
							}
						});	
						
					
				}	
			});	
	
});


app.post('/addquiz',function(req,res){

    console.log("Inside addquiz Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CID: ",req.body.cid);
	console.log("Req Body QuizName: ",req.body.quizname);
	console.log("Req Body QuesionNum : ",req.body.qcount);
	console.log("Req Body Question : ",req.body.question);
	console.log("Req Body Right_A: ",req.body.right_a);
	console.log("Req Body A1: ",req.body.a1);
	console.log("Req Body A2: ",req.body.a2);
	console.log("Req Body A3: ",req.body.a3);

			pool.getConnection((err1,con) => {
				if(err1){ throw err1;}
				else {
					
					console.log("inside insert into course_quiz_map1 table");
		
						var sql = "INSERT INTO course_quiz_map1 (CourseId, QuizName, QuestionNumber, Question, RightA, A1, A2, A3) VALUES ( "+mysql.escape(req.body.cid)+" ,"+mysql.escape(req.body.quizname)+" ,"+mysql.escape(req.body.qcount)+" ,"+mysql.escape(req.body.question)+" ,"+mysql.escape(req.body.right_a)+" ,"+mysql.escape(req.body.a1)+" ,"+mysql.escape(req.body.a2)+" ,"+mysql.escape(req.body.a3)+")";
		                console.log(sql);
						con.query(sql, (err2, result) => {
							if(err2) {
								throw err2;
								console.log("Q ADD Failed");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Q ADD Failed");
							}else {
							
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end("Q_ADD_Successfull");
							}
						});	
						
					
				}	
			});	
	
});

app.post('/uploadnotes',function(req,res){

    console.log("Inside uploadnotes Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body files: ",req.files.file);
	console.log("Req Body file Name: ",req.files.file.name);
	console.log("Req Body User Name: ",req.body.userid);
	console.log("Req Body Course Name: ",req.body.cid);
	console.log("Req Body Notes Name: ",req.body.AssignName);

	let uploadFile = req.files.file;
	const fileName = req.files.file.name;
	uploadFile.mv(
	  `${__dirname}/uploads/notes/${fileName}`,
	  function (err) {
		if (err) {
		  throw err;
		  console.log("Upload Failed");
		  res.writeHead(400,{'Content-Type' : 'text/plain'});
		  res.end("Upload Failed");
		} else {
		//else starts

			pool.getConnection((err1,con) => {
				if(err1){ throw err1;}
				else {
					
					console.log("inside insert into course_notes_map table");
		
						var sql = "INSERT INTO course_notes_map (CourseId, NotesName, FileName) VALUES ( " +mysql.escape(req.body.cid)+" ,"+mysql.escape(req.body.AssignName)+" ,"+mysql.escape(req.files.file.name)+" )";
		                console.log(sql);
						con.query(sql, (err2, result) => {
							if(err2) {
								throw err2;
								console.log("Upload Failed");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("Upload Failed");
							}else {
								
								var filePath = {
									file: `uploads/notes/${req.files.file.name}`,
								};  
								console.log("Sending Response File Path Uploaded: "+JSON.stringify(filePath));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(filePath));
							}
						});	
						
					
				}	
			});	

		}//else ends

	})
	
});



app.post('/coursegetnotes',function(req,res){

    console.log("Inside coursegetnotes Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	
	


			var sql = "SELECT DISTINCT CourseId, NotesName, FileName FROM course_notes_map WHERE CourseId = " +mysql.escape(req.body.cid);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No notes Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_NOTES_YET");
							} else {								
								
								console.log(result);	
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

													
				}
			});				

    
});


app.post('/coursegetnotes_for_student',function(req,res){

    console.log("Inside coursegetnotes_for_student Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {

			var sql = "SELECT DISTINCT  CourseId, NotesName, FileName FROM course_notes_map WHERE CourseId = " +mysql.escape(req.body.cid);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Notes Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_NOTES_YET");
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


app.post('/addann',function(req,res){

    console.log("Inside addquiz Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CID: ",req.body.cid);
	console.log("Req Body annTitle: ",req.body.annTitle);
	console.log("Req Body annContent : ",req.body.annContent);


			pool.getConnection((err1,con) => {
				if(err1){ throw err1;}
				else {
					
					console.log("inside insert into course_ann_map table");
		
						var sql = "INSERT INTO course_ann_map (CourseId, AnnTitle, AnnContent) VALUES ( "+mysql.escape(req.body.cid)+" ,"+mysql.escape(req.body.annTitle)+" ,"+mysql.escape(req.body.annContent)+")";
		                console.log(sql);
						con.query(sql, (err2, result) => {
							if(err2) {
								throw err2;
								console.log("Ann ADD Failed");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_ANN_YET");
							}else {
							
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end("ANN_ADD_Successful");
							}
						});	
						
					
				}	
			});	
	
});

app.post('/coursegetann',function(req,res){

    console.log("Inside coursegetann Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	
	


			var sql = "SELECT DISTINCT AnnTitle, AnnContent FROM course_ann_map WHERE CourseId = " +mysql.escape(req.body.cid);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Ann Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_ANN_YET");
							} else {								
								
								console.log(result);	
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

													
				}
			});				


    
});

app.post('/coursegetann_for_student',function(req,res){

    console.log("Inside coursegetann_for_student Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {

			var sql = "SELECT DISTINCT AnnTitle, AnnContent FROM course_ann_map WHERE CourseId = " +mysql.escape(req.body.cid);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Ann Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_ANN_YET");
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

app.post('/coursegetdes',function(req,res){

    console.log("Inside coursegetdes Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	
	


			var sql = "SELECT DISTINCT * FROM course_table1 WHERE CourseId = " +mysql.escape(req.body.cid);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Ann Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_COURSE_YET");
							} else {								
								
								console.log(result);	
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

													
				}
			});				

    
});

app.post('/coursegetquiz',function(req,res){

    console.log("Inside coursegetquiz Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	
	


			var sql = "SELECT DISTINCT QuizName FROM course_quiz_map1 WHERE CourseId = " +mysql.escape(req.body.cid);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No QUIZ Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_QUIZS_YET");
							} else {								
								
								console.log(result);	
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

													
				}
			});				


    
});

app.post('/quizview',function(req,res){

    console.log("Inside quizview Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	console.log("QuizName : "+req.body.QuizName);
	
	


			var sql = "SELECT DISTINCT * FROM course_quiz_map1 WHERE CourseId = "+mysql.escape(req.body.cid)+" AND QuizName = "+mysql.escape(req.body.QuizName);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No QUIZ Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_QUIZS_YET");
							} else {								
								
								console.log(result);	
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

													
				}
			});				

    
});

app.post('/viewppl',function(req,res){

    console.log("Inside viewppl Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	
	

			var sql = "SELECT DISTINCT Student FROM student_course_map WHERE CourseId = " +mysql.escape(req.body.cid);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No Students Yet");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_STUDENTS_YET");
							} else {								
								
								console.log(result);	
								console.log("Sending Response: "+JSON.stringify(result));
								res.writeHead(200,{'Content-Type' : 'application/json'});
								res.end(JSON.stringify(result));
							}

													
				}
			});				


    
});


//Route to handle Post Request Call
app.post('/addcourse_waitlist',function(req,res){

    console.log("Inside addcourse_waitlist Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CID: ",req.body.cid);
	console.log("Req Body Pname: ",req.body.pname);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside student_course_map table");


				var sql = "SELECT * FROM course_table1 WHERE CourseId ="+mysql.escape(req.body.cid);
				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("User Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Added");
					}else {//First_ELSE//
						console.log("RAGS DEBUG: "+JSON.stringify(result));

						if(parseInt(result[0].CurrentSize,10) < parseInt(result[0].CourseCapacity,10)) 
						{//BIG IF BEGINS

						///// Next Query /////////////////////////
						pool.getConnection((err1_next,con_next) => {
							if(err1_next){ throw err1_next;}
							else {
								
								console.log("inside increment current size in courses table");
					
									var sql_next = "UPDATE course_table1 SET CurrentSize=CurrentSize+1 WHERE CourseId = "+mysql.escape(req.body.cid);
									console.log(sql_next);
									con_next.query(sql_next, (err2_next, result_next) => {
										if(err2_next) {
											throw err2_next;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}
									});	
							
							}	
						});	

						pool.getConnection((err1_next1,con_next1) => {
							if(err1_next1){ throw err1_next1;}
							else {
								
								console.log("inside student_course_map table");
					
									var sql_next1 = "INSERT INTO student_course_map (Student, CourseId) VALUES ( " +mysql.escape(req.body.pname)+" ,"+mysql.escape(req.body.cid)+ " )";
									con_next1.query(sql_next1, (err2_next1, result_next1) => {
										if(err2_next1) {
											throw err2_next1;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}else {

											console.log("User Added Successfully!!!!");
											res.writeHead(200,{'Content-Type' : 'text/plain'})
											res.end("User Added Successfully!!!");
										}
									});	
							
								}	
						});	
						///// Next Query Ends /////////////////////	

						}//BIG IF ENDS/////
						else if ((parseInt(result[0].CurrentSize,10) === parseInt(result[0].CourseCapacity,10)) && (parseInt(result[0].CurrentWaitlistSize,10) < parseInt(result[0].WaitlistCapacity,10)))
						{//BIG ELSE IF BEGINS

						///// Next Query /////////////////////////
						pool.getConnection((err1_next,con_next) => {
							if(err1_next){ throw err1_next;}
							else {
								
								console.log("inside increment current waitlist size in courses table");
					
									var sql_next = "UPDATE course_table1 SET CurrentWaitlistSize=CurrentWaitlistSize+1 WHERE CourseId = "+mysql.escape(req.body.cid);
									console.log(sql_next);
									con_next.query(sql_next, (err2_next, result_next) => {
										if(err2_next) {
											throw err2_next;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}
									});	
							
							}	
						});	

						pool.getConnection((err1_next1,con_next1) => {
							if(err1_next1){ throw err1_next1;}
							else {
								
								console.log("inside student_course_map table");
					
									var sql_next1 = "INSERT INTO student_course_map (Student, CourseId) VALUES ( " +mysql.escape(req.body.pname)+" ,"+mysql.escape(req.body.cid)+ " )";
									con_next1.query(sql_next1, (err2_next1, result_next1) => {
										if(err2_next1) {
											throw err2_next1;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}else {

											console.log("User Added Successfully!!!!");
											res.writeHead(200,{'Content-Type' : 'text/plain'})
											res.end("User Added Successfully!!!");
										}
									});	
							
								}	
						});	
						///// Next Query Ends /////////////////////	
						}//BIG ELSE IF ENDS
						else {
							console.log("COURSE FULL. SHOULD NOT ARRIVE AT THIS CONDITION");
							res.writeHead(400,{'Content-Type' : 'text/plain'});
							res.end("COURSE_FULL");

						} //IF ELSE COMPLETE

					}//First_ELSE ends//
				});	
		
		}	
	});	
    
});


app.post('/dropcourse_waitlist',function(req,res){

	console.log("Inside Drop Course Delete Request");
	console.log("Course to be deleted: "+req.body.cid);
	console.log("Course to be deleted for student: "+req.body.pname);

	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside student_course_map table");


				var sql = "SELECT * FROM course_table1 WHERE CourseId ="+mysql.escape(req.body.cid);
				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("User Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Added");
					}else {//First_ELSE//
						console.log("RAGS DEBUG: "+JSON.stringify(result));

						if(parseInt(result[0].CurrentWaitlistSize,10) > 0) 
						{//BIG IF BEGINS

						///// Next Query /////////////////////////
						pool.getConnection((err1_next,con_next) => {
							if(err1_next){ throw err1_next;}
							else {
								
								console.log("inside decrement current waitlist size in courses table");
					
									var sql_next = "UPDATE course_table1 SET CurrentWaitlistSize=CurrentWaitlistSize-1 WHERE CourseId = "+mysql.escape(req.body.cid);
									console.log(sql_next);
									con_next.query(sql_next, (err2_next, result_next) => {
										if(err2_next) {
											throw err2_next;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}
									});	
							
							}	
						});	

						pool.getConnection((err1_next1,con_next1) => {
							if(err1_next1){ throw err1_next1;}
							else {
								var sql_next1 = "DELETE FROM student_course_map WHERE Student = "+mysql.escape(req.body.pname)+" AND CourseId = "+mysql.escape(req.body.cid);
								console.log(sql_next1);
								con_next1.query(sql_next1, (err2_next1, result_next1, fields_next1) => {
									if(err2_next1) {
										 throw err2_next1;
										 res.writeHead(400,{'Content-Type' : 'text/plain'});
										 res.end("Query Failed: "+sql_next1);
									}else {
										res.writeHead(200,{'Content-Type' : 'application/json'});
										res.end("Delection Successfull");
									}
								});	
							
							}	
						});	

						///// Next Query Ends /////////////////////	
                        //BIG IF ENDS/////
						} else if ((parseInt(result[0].CurrentWaitlistSize,10) === 0) && (parseInt(result[0].CurrentSize,10) > 0))
						{//BIG ELSE IF BEGINS
						///// Next Query /////////////////////////
						pool.getConnection((err1_next,con_next) => {
							if(err1_next){ throw err1_next;}
							else {
								
								console.log("inside decrement current size in courses table");
					
									var sql_next = "UPDATE course_table1 SET CurrentSize=CurrentSize-1 WHERE CourseId = "+mysql.escape(req.body.cid);
									console.log(sql_next);
									con_next.query(sql_next, (err2_next, result_next) => {
										if(err2_next) {
											throw err2_next;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}
									});	
							
							}	
						});	

						pool.getConnection((err1_next1,con_next1) => {
							if(err1_next1){ throw err1_next1;}
							else {
								var sql_next1 = "DELETE FROM student_course_map WHERE Student = "+mysql.escape(req.body.pname)+" AND CourseId = "+mysql.escape(req.body.cid);
								console.log(sql_next1);
								con_next1.query(sql_next1, (err2_next1, result_next1, fields_next1) => {
									if(err2_next1) {
										 throw err2_next1;
										 res.writeHead(400,{'Content-Type' : 'text/plain'});
										 res.end("Query Failed: "+sql_next1);
									}else {
										res.writeHead(200,{'Content-Type' : 'application/json'});
										res.end("Delection Successfull");
									}
								});	
							
							}	
						});	

						///// Next Query Ends /////////////////////	
						}//BIG ELSE IF ENDS
						else {
							console.log("NOTHING TO DELETE. SHOULD NOT ARRIVE AT THIS CONDITION");
							res.writeHead(400,{'Content-Type' : 'text/plain'});
							res.end("COURSE_EMPTY");

						} //IF ELSE COMPLETE

					}//First_ELSE ends//
				});	
		
		}	
	});	
    
});


app.post('/addcode',function(req,res){

    console.log("Inside addcode Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CourseID: ",req.body.cid);
	console.log("Req Body For Student: ",req.body.studentName);
	console.log("Req Body Code: ",req.body.code);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside insert into code_course_map table");

				var sql = "INSERT INTO code_course_map  (CourseId, Student, Code) VALUES ( "+mysql.escape(req.body.cid)+" ,"+mysql.escape(req.body.studentName)+" ,"+mysql.escape(req.body.code)+" )";
                console.log(sql);
				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("Code Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("Code Counldn't be Added");
					}else {
							console.log("Code Added Successfully!!!!");
							res.writeHead(200,{'Content-Type' : 'text/plain'})
							res.end("Code Added Successfully!!!");
					}
				});	
				
			
		}	
	});	
	
	
    
});

app.post('/codecheck',function(req,res){

    console.log("Inside codecheck Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CourseID: ",req.body.cid);
	console.log("Req Body For Student: ",req.body.pname);
	console.log("Req Body Code: ",req.body.code);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside read from code_course_map table");

				var sql = "SELECT Code FROM code_course_map WHERE Student = "+mysql.escape(req.body.pname)+" AND CourseId = "+mysql.escape(req.body.cid);
                console.log(sql);
				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("Code Counldn't be Found!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("Code Counldn't be Found");
					}else {
						  console.log(result);
						  if(result[0].Code === req.body.code) {
							console.log("Code Added Successfully!!!!");
							res.writeHead(200,{'Content-Type' : 'text/plain'})
							res.end("CODE_CHECK_SUCCESS");
						  } else {
							console.log("Code Counldn't be Found!!!!");
							res.writeHead(400,{'Content-Type' : 'text/plain'});
							res.end("CODE_CHECK_FAILED");
						  }
					}
				});	
				
			
		}	
	});	
	
	
    
});


app.post('/addcourse_withcode',function(req,res){

    console.log("Inside addcourse_waitlist Post Request");
	console.log("Req Body : ",req.body);
	console.log("Req Body CID: ",req.body.cid);
	console.log("Req Body Pname: ",req.body.pname);
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside student_course_map table");


				var sql = "SELECT * FROM course_table1 WHERE CourseId ="+mysql.escape(req.body.cid);
				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("User Counldn't be Added!!!!");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("User Counldn't be Added");
					}else {//First_ELSE//
						console.log("RAGS DEBUG: "+JSON.stringify(result));

						if(parseInt(result[0].CurrentSize,10) < parseInt(result[0].CourseCapacity,10)) 
						{//BIG IF BEGINS

						///// Next Query /////////////////////////
						pool.getConnection((err1_next,con_next) => {
							if(err1_next){ throw err1_next;}
							else {
								
								console.log("inside increment current size in courses table");
					
									var sql_next = "UPDATE course_table1 SET CurrentSize=CurrentSize+1 WHERE CourseId = "+mysql.escape(req.body.cid);
									console.log(sql_next);
									con_next.query(sql_next, (err2_next, result_next) => {
										if(err2_next) {
											throw err2_next;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}
									});	
							
							}	
						});	

						pool.getConnection((err1_next1,con_next1) => {
							if(err1_next1){ throw err1_next1;}
							else {
								
								console.log("inside student_course_map table");
					
									var sql_next1 = "INSERT INTO student_course_map (Student, CourseId) VALUES ( " +mysql.escape(req.body.pname)+" ,"+mysql.escape(req.body.cid)+ " )";
									con_next1.query(sql_next1, (err2_next1, result_next1) => {
										if(err2_next1) {
											throw err2_next1;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}else {

											console.log("User Added Successfully!!!!");
											res.writeHead(200,{'Content-Type' : 'text/plain'})
											res.end("User Added Successfully!!!");
										}
									});	
							
								}	
						});	
						///// Next Query Ends /////////////////////	

						}//BIG IF ENDS/////
						else if ((parseInt(result[0].CurrentSize,10) === parseInt(result[0].CourseCapacity,10)) && (parseInt(result[0].CurrentWaitlistSize,10) >= 0 ))
						{//BIG ELSE IF BEGINS

						///// Next Query /////////////////////////
						pool.getConnection((err1_next,con_next) => {
							if(err1_next){ throw err1_next;}
							else {
								
								console.log("inside increment current waitlist size in courses table");
					
									var sql_next = "UPDATE course_table1 SET CurrentSize=CurrentSize+1,CourseCapacity=CourseCapacity+1 WHERE CourseId = "+mysql.escape(req.body.cid);
									console.log(sql_next);
									con_next.query(sql_next, (err2_next, result_next) => {
										if(err2_next) {
											throw err2_next;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}
									});	
							
							}	
						});	

						pool.getConnection((err1_next1,con_next1) => {
							if(err1_next1){ throw err1_next1;}
							else {
								
								console.log("inside student_course_map table");
					
									var sql_next1 = "INSERT INTO student_course_map (Student, CourseId) VALUES ( " +mysql.escape(req.body.pname)+" ,"+mysql.escape(req.body.cid)+ " )";
									con_next1.query(sql_next1, (err2_next1, result_next1) => {
										if(err2_next1) {
											throw err2_next1;
											console.log("User Counldn't be Added!!!!");
											res.writeHead(400,{'Content-Type' : 'text/plain'});
											res.end("User Counldn't be Added");
										}else {

											console.log("User Added Successfully!!!!");
											res.writeHead(200,{'Content-Type' : 'text/plain'})
											res.end("User Added Successfully!!!");
										}
									});	
							
								}	
						});	
						///// Next Query Ends /////////////////////	
						}//BIG ELSE IF ENDS
						else {
							console.log("COURSE FULL. SHOULD NOT ARRIVE AT THIS CONDITION");
							res.writeHead(400,{'Content-Type' : 'text/plain'});
							res.end("COURSE_FULL");

						} //IF ELSE COMPLETE

					}//First_ELSE ends//
				});	
		
		}	
	});	
    
});


app.post('/submitquiz',function(req,res){

    console.log("Inside submitquiz Post Request");
	console.log("New Course Req Body : ",req.body);
	console.log("New Course Req CID : ",req.body.cid);
	console.log("New Course Req Student : ",req.body.pname);
	console.log("New Course Req QuizName : ",req.body.QuizName);
	console.log("New Course Req MaxS : ",req.body.maxS);
	console.log("New Course Req MyScore : ",req.body.myScore);
	console.log("New Course Req Taken : ",req.body.taken);
	
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {
			
			console.log("inside insert into student_quiz_map");

				var sql = "INSERT INTO student_quiz_map  (CourseId, Student, QuizName, MaxS, MyScore, Taken) VALUES ( " +mysql.escape(req.body.cid)+" ,"+mysql.escape(req.body.pname)+" ,"+mysql.escape(req.body.QuizName)+" ,"+mysql.escape(req.body.maxS)+" ,"+mysql.escape(req.body.myScore)+" ,"+mysql.escape(req.body.taken)+" )";

				con.query(sql, (err2, result) => {
					if(err2) {
						throw err2;
						console.log("QUIZ_SCORE_NOT_ADDED");
						res.writeHead(400,{'Content-Type' : 'text/plain'});
						res.end("QUIZ_SCORE_NOT_ADDED");
					}else {
							console.log("QUIZ_SCORE_ADDED");
							res.writeHead(200,{'Content-Type' : 'text/plain'})
							res.end("QUIZ_SCORE_ADDED");
					}
				});	
				
			
		}	
	});	
	
	
    
});

app.post('/coursegetquiztaken',function(req,res){

    console.log("Inside coursegetquizkaten Post Request");
	console.log("Req Body : ",req.body);
	console.log("Course ID : "+req.body.cid);
	console.log("Course Student : "+req.body.pname);
	
	
	pool.getConnection((err1,con) => {
		if(err1){ throw err1;}
		else {

			var sql = "SELECT DISTINCT * FROM student_quiz_map WHERE CourseId = " +mysql.escape(req.body.cid)+" AND Student = "+mysql.escape(req.body.pname);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
				if(err2) {
					 throw err2;
					 
					 res.writeHead(400,{'Content-Type' : 'text/plain'});
					 res.end("Query Failed: "+sql);
				}else {
							console.log(result);
							if(result === undefined || result.length == 0) {
								console.log("array empty or does not exist");
								console.log("No QUIZ Yet for Student");
								res.writeHead(400,{'Content-Type' : 'text/plain'});
								res.end("NO_QUIZS_YET");
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

app.post('/profilepage',function(req,res){

    console.log("Inside profilepage Post Request");
	console.log("Req Body : ",req.body);
	console.log("Student Name : "+req.body.pname);
	

			var sql = "SELECT * FROM profile_table WHERE first_name = " +mysql.escape(req.body.pname);
			console.log(sql);
			con.query(sql, (err2, result, fields) => {
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

    
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");