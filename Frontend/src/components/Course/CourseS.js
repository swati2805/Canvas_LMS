import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FileUpload from './FileUpload';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class CourseS extends Component {
	
  constructor(props){
    super(props);
    this.state={
      cid:'Default_CID',
      cname:'Default_CNAME',
      pname: '',
      ptype: '',
      assignments: [],
      notes: [],
      accouncements: [],
      courseDes: [],
      ac: 0,
      AssignNameSelected: 'DEFAULT',
      AssignSelected: false,
      viewSubmittedAssign: false,
      viewPpl: false,
      quizToSee: '',
      quizToSeeDone: false,
      quizToTake: '',
      quizToTakeDone: false,
      quizs: 'NO_QUIZS_YET',
      quizs_taken: 'NO_QUIZS_YET',

    }

  }	

  shouldComponentUpdate(nextProps, nextState){
    console.log('Should Component update', nextProps, "state", nextState);
   return true;
    
  }

  componentWillMount(){
			
		if(this.props.location.state != undefined){	
			console.log(this.props.location.state.id);	
			var myObj = JSON.parse(this.props.location.state.id);
			this.setState({
            cname : myObj.label,
						cid : myObj.myinput,
            pname : myObj.pname,
            ptype : myObj.ptype
            
            })
		} else {
			var myObj = {label: "DefaultL", myinput: "DefaultInput", pname : "Default",  ptype : "Default"};
      this.setState({ pname : this.props.logininfo.result.username})

		}

  }	

componentDidMount(){
    console.log('Component Did Mount of Course Main');
    const data = {cid: this.state.cid, pname: this.state.pname};
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/coursegetassign_for_student/',data)
        .then(response =>{
            if(response.status === 200){
                console.log(response.data);
                this.setState({
                    assignments: response.data,
                    ac: this.state.ac+1,
                })
                console.log("GOT Response in coursegetassign post: "+this.state.assignments);				
            }
        });

    axios.post('http://localhost:3001/coursegetnotes_for_student/',data)
        .then(response =>{
            if(response.status === 200){
                console.log(response.data);
                this.setState({
                    notes: response.data,
      
                })
                console.log("GOT Response in coursegetnotes post: "+this.state.notes);				
            }
    });      
    
    axios.post('http://localhost:3001/coursegetann_for_student/',data)
        .then(response =>{
            if(response.status === 200){
                console.log(response.data);
                this.setState({
                    accouncements: response.data,
      
                })
                console.log("GOT Response in coursegetann post: "+this.state.accouncements);				
            }
    });       

    axios.post('http://localhost:3001/coursegetdes/',data)
    .then(response =>{
        if(response.status === 200){
            console.log(response.data);
            this.setState({
              courseDes: response.data,
            })
            console.log("GOT Response in coursegetdes post: "+this.state.courseDes);				
        }
    });       
    axios.post('http://localhost:3001/coursegetquiz/',data)
    .then(response =>{
        if(response.status === 200){
            console.log(response.data);
            this.setState({
               quizs: response.data,
            })
            console.log("GOT Response in coursegetquiz post: "+this.state.quizs);				
        }
    }); 
    axios.post('http://localhost:3001/coursegetquiztaken/',data)
    .then(response =>{
        if(response.status === 200){
            console.log(response.data);
            this.setState({
               quizs_taken: response.data,
            })
            console.log("GOT Response in coursegetquiztaken post: "+this.state.quizs_taken);				
        }
    }); 
}

 render() {

  
  let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
      console.log("Cant load cookie at search page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.AssignSelected){
      console.log("AssignSelected is done. Going back to submit assign page");
      var textObj = { cid: this.state.cid, pname: this.state.pname, AssignName : this.state.AssignNameSelected};
      var text = 	JSON.stringify(textObj);	
      redirectVar = <Redirect to={{
        pathname: '/submita',
        state: { id: text}
      }} />
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.quizToTakeDone){
    console.log("quizToTakeDone is set. Going to take quiz page with quizToTake: "+this.state.quizToTake);
    var textObj6 = { cid: this.state.cid, QuizName : this.state.quizToTake, pname : this.state.pname};
    var text6 = 	JSON.stringify(textObj6);	
    redirectVar = <Redirect to={{
      pathname: '/takequiz',
      state: { id: text6}
    }} />
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.quizToSeeDone){
    console.log("quizToSeeDone is set. Going to view quiz page with quizToSee: "+this.state.quizToSee);
    var textObj7 = { cid: this.state.cid, QuizName : this.state.quizToSee};
    var text7 = 	JSON.stringify(textObj7);	
    redirectVar = <Redirect to={{
      pathname: '/quizview',
      state: { id: text7}
    }} />
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.viewSubmittedAssign){
    console.log("viewSubmittedAssign is set. Going to assignment view page");
    var textObj1 = { cid: this.state.cid, pname: this.state.pname};
    var text1 = 	JSON.stringify(textObj1);	
    redirectVar = <Redirect to={{
      pathname: '/viewa',
      state: { id: text1}
    }} />
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag&& this.state.viewPpl){
    console.log("viewPpl is set. Going to people view page");
    var textObj2 = { cid: this.state.cid, pname: this.state.pname, ptype: this.state.ptype};
    var text2 = 	JSON.stringify(textObj2);	
    redirectVar = <Redirect to={{
      pathname: '/viewppl',
      state: { id: text2}
    }} />
  }  

  let assign_list = null;
  if(this.state.assignments !== 'NO_ASSIGNMENTS_YET') {
    assign_list = this.state.assignments.map(a => {
      var tempFilePath = `http://localhost:3001/uploads/assignments/${a.FileName}`
      console.log("Assign File Path: "+tempFilePath);
      return ( 
            <div key={a.AssignName}>
                  <li class="list-group-item list-group-item-warning">{a.AssignName}
                        <a href={tempFilePath} download>
			               <button  className="btn btn-success pull-right">Download</button>
		                </a>
                        <a>
			               <button  onClick={() => this.setState({AssignNameSelected : a.AssignName, AssignSelected: true})} className="btn btn-primary pull-right">Submit</button>
		                </a>
                  </li>
                  
            </div>
      )
    });
  }


  var quizNameTaken = null;
  if(this.state.quizs_taken !== 'NO_QUIZS_YET' && this.state.quizs_taken !==null) {
    quizNameTaken = this.state.quizs_taken.map(q => {
        return q.QuizName
    });
   
  }

 

  let quiz_list = null;
  if(this.state.quizs !== 'NO_QUIZS_YET') {
    quiz_list = this.state.quizs.map(a => {

       var taken = false;
       if(quizNameTaken === undefined || quizNameTaken === null || quizNameTaken.length == 0 ) {
         taken = false;
       } else {
         taken = quizNameTaken.includes(a);
       }
       console.log(a);
       console.log(taken);
       var returnStr = null;
       if(!taken) {
            returnStr =  <div key={a}>
            <li class="list-group-item list-group-item-warning">{a}
            <a>
               <button  onClick={() => this.setState({quizToTake : a, quizToTakeDone: true})} className="btn btn-danger pull-right">Take Quiz</button>
            </a>
            </li>
            </div>
       }
       console.log("Returning STR"+ returnStr);
      
      return (         
        returnStr
      )

    });
    
  }


  let final_quiz_list = [];
  if(this.state.quizs_taken !== 'NO_QUIZS_YET') {
    final_quiz_list = this.state.quizs_taken.map(a => {
      return ( 
            <div key={a.QuizName}>
                  <li class="list-group-item list-group-item-warning">QUIZ: {a.QuizName} QUIZ_TAKEN_ALREADY MyScore: {a.MyScore}/{a.MaxS}
                  <a>
                    <button  onClick={() => this.setState({quizToSee : a.QuizName, quizToSeeDone: true})} className="btn btn-success pull-right">View Quiz Solution</button>
                  </a>
                  </li>
            </div>
      )
    });

  }


  if(this.state.quizs !== 'NO_QUIZS_YET' && final_quiz_list !== null) {
    final_quiz_list = final_quiz_list.concat(quiz_list);

  }


  let notes_list = null;
  if(this.state.notes !== 'NO_NOTES_YET') {
    notes_list = this.state.notes.map(a => {
      var tempFilePath1 = `http://localhost:3001/uploads/notes/${a.FileName}`
      console.log("Notes File Path: "+tempFilePath1);
      return ( 
            <div key={a.NotesName}>
                  <li class="list-group-item list-group-item-warning">{a.NotesName}
                    <a href={tempFilePath1} download>
			               <button  className="btn btn-success pull-right">Download</button>
		                </a>
                  </li>
            </div>
      )
    });
  }

  let ann_list = null;
  if(this.state.accouncements !== 'NO_ANN_YET') {
    ann_list = this.state.accouncements.map(a => {
      return ( 
                  <div key={a.AnnTitle}>
                  <li class="list-group-item list-group-item-warning">{a.AnnTitle} : {a.AnnContent}
                  </li>
                  </div>
      )
    });
  }
  let des_list = null;
  if(this.state.courseDes !== 'NO_COURSE_YET') {
    des_list = this.state.courseDes.map(a => {
      return ( 
                  <div key={a.CourseId}>
                  <li class="list-group-item list-group-item-warning">Overview: {a.CourseDescription}
                  </li>
                  <li class="list-group-item list-group-item-warning">Room: {a.CourseRoom} Faculty: {a.Faculty} Term: {a.CourseTerm} Department: {a.CourseDept}
                  </li>
                  </div>
      )
    });
  }

	return (
    <div>
    {redirectVar}


<div>
    <div class="container-fluid"> 
    <div class="panel panel-danger">
        <div class="panel-heading">
           <h1>{this.state.cid} : {this.state.cname} User: {this.state.pname} UserType: {this.state.ptype}</h1>
        </div>
    </div>


    <div class="panel panel-primary">
      <div class="panel-heading"><h3>Description</h3></div>

      <ul class="list-group">
            {des_list}
      </ul>
    </div>

    <div class="login-or">
        <hr class="hr-or"/>
    </div>
		

    <div class="panel panel-primary">
      <div class="panel-heading"><h3>Announcements</h3></div>

      <ul class="list-group">
          {ann_list}
      </ul>
    </div>

    <div class="login-or">
        <hr class="hr-or"/>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading"><h3>Lecture Notes</h3></div>

      <ul class="list-group">
         {notes_list}
      </ul>

    </div>

    <div class="login-or">
        <hr class="hr-or"/>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading"><h3>Assignments</h3></div>

      <ul class="list-group">
         {assign_list}
      </ul>

      <a>
			<button  onClick={() => this.setState({viewSubmittedAssign: true})} className="btn btn-danger">View Submitted Assignments</button>
	  </a>

    </div>

    <div class="login-or">
        <hr class="hr-or"/>
    </div>


    <div class="panel panel-primary">
      <div class="panel-heading"><h3>Quiz</h3></div>

      <ul class="list-group">
        {final_quiz_list}
      </ul>

    </div>

    <div class="login-or">
        <hr class="hr-or"/>
    </div>


    <div class="panel panel-primary">
      <div class="panel-heading"><h3>People</h3></div>

      <ul class="list-group">

      </ul>
      <a>
			    <button  onClick={() => this.setState({viewPpl: true})} className="btn btn-danger">View Enrolled Students</button>
	    </a>
    </div>

    </div>	
	</div>

  </div>
	
	);
 }
	
}

  //This method is provided by redux and it gives access to centeral store
function mapStateToProps(state) {
    return { logininfo : state.logininfo };
}

//export Home Component
//export default HomeS;

export default connect(mapStateToProps, null)(CourseS)

//export default CourseS;