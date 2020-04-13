import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FileUpload from './FileUpload';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class Course extends Component {
	
  constructor(props){
    super(props);
    this.state={
      cid:'Default_CID',
      cname:'Default_CNAME',
      pname: '',
      ptype: '',
      assignments: [],
      quizs : [],
      notes: [],
      accouncements: [],
      courseDes: [],
      newAssignUpload: false,
      newNotesUpload: false,
      ac: 0,
      selectedToGrade: '',
      selectedToGradeDone: false,
      quizToSee: '',
      quizToSeeDone: false,
      newQuiz: false,
      viewPpl: false,

    }
    this.newAssignUploadHandler = this.newAssignUploadHandler.bind(this);
    this.newNotesUploadHandler = this.newNotesUploadHandler.bind(this);
  }	
  
  newAssignUploadHandler = () => {
    console.log("State of newAssignUpload to: "+this.state.newAssignUpload)
    this.setState({
        newAssignUpload : true
    })
    console.log("Changing State of newAssignUpload to: "+this.state.newAssignUpload)
  }

  newNotesUploadHandler = () => {
    console.log("State of newNotesUpload to: "+this.state.newNotesUpload)
    this.setState({
        newNotesUpload : true
    })
    console.log("Changing State of newNotesUpload to: "+this.state.newNotesUpload)
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
    const data = {pname : this.state.pname, cid: this.state.cid};
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/coursegetassign/',data)
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

    axios.post('http://localhost:3001/coursegetnotes/',data)
        .then(response =>{
            if(response.status === 200){
                console.log(response.data);
                this.setState({
                    notes: response.data,
                })
                console.log("GOT Response in coursegetnotes post: "+this.state.notes);				
            }
    });

    axios.post('http://localhost:3001/coursegetann/',data)
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
}

	
 render() {

  
  let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
      console.log("Cant load cookie at search page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.newAssignUpload){
      console.log("newAssignUpload is done. Going back to home");
      redirectVar = <Redirect to= "/home"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.newNotesUpload){
    console.log("newNotesUpload is done. Going back to home");
    redirectVar = <Redirect to= "/home"/>
  } 
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.selectedToGradeDone){
    console.log("selectedToGradeDone is set. Going to grades page with selectedToGrade: "+this.state.selectedToGrade);
    var textObj = { cid: this.state.cid, AssignName : this.state.selectedToGrade};
    var text = 	JSON.stringify(textObj);	
    redirectVar = <Redirect to={{
      pathname: '/grade',
      state: { id: text}
    }} />
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.quizToSeeDone){
    console.log("quizToSeeDone is set. Going to view quiz page with quizToSee: "+this.state.quizToSee);
    var textObj6 = { cid: this.state.cid, QuizName : this.state.quizToSee};
    var text6 = 	JSON.stringify(textObj6);	
    redirectVar = <Redirect to={{
      pathname: '/quizview',
      state: { id: text6}
    }} />
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.newQuiz){
    console.log("NewQuiz is set. Going to Add new quiz page with selectedToGrade");
    var textObj1 = { cid: this.state.cid, pname : this.state.pname};
    var text1 = 	JSON.stringify(textObj1);	
    redirectVar = <Redirect to={{
      pathname: '/addquiz',
      state: { id: text1}
    }} />
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.newAnn){
    console.log("NewAnn is set. Going to Add new ann page");
    var textObj2 = { cid: this.state.cid, pname : this.state.pname};
    var text2 = 	JSON.stringify(textObj2);	
    redirectVar = <Redirect to={{
      pathname: '/addann',
      state: { id: text2}
    }} />
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.viewPpl){
    console.log("viewPpl is set. Going to people view page");
    var textObj3 = { cid: this.state.cid, pname: this.state.pname, ptype: this.state.ptype};
    var text3 = 	JSON.stringify(textObj3);	
    redirectVar = <Redirect to={{
      pathname: '/viewppl',
      state: { id: text3}
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
                  <a>
			               <button  onClick={() => this.setState({selectedToGrade : a.AssignName, selectedToGradeDone: true})} className="btn btn-danger pull-right">View Submissions And Grade</button>
		              </a>
                  <a href={tempFilePath} download>
			               <button  className="btn btn-success pull-right">Download</button>
		              </a>
                  </li>
                  </div>
      )
    });
  }

  let quiz_list = null;
  if(this.state.quizs !== 'NO_QUIZS_YET') {
    quiz_list = this.state.quizs.map(a => {

      return ( 
                  <div key={a}>
                  <li class="list-group-item list-group-item-warning">{a}
                  <a>
			               <button  onClick={() => this.setState({quizToSee : a, quizToSeeDone: true})} className="btn btn-success pull-right">View Quiz</button>
		              </a>
                  </li>
                  </div>
      )
    });
  }
  
  let notes_list = null;
  if(this.state.notes !== 'NO_NOTES_YET') {
    notes_list = this.state.notes.map(a => {
      var tempFilePath = `http://localhost:3001/uploads/notes/${a.FileName}`
      console.log("Notes File Path: "+tempFilePath);
      return ( 
                  <div key={a.NotesName}>
                  <li class="list-group-item list-group-item-warning">{a.NotesName}
                  <a href={tempFilePath} download>
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
      <a>
			    <button  onClick={() => this.setState({newAnn : true})} className="btn btn-danger">Add New Announcement</button>
		  </a>
    </div>

    <div class="login-or">
        <hr class="hr-or"/>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading"><h3>Lecture Notes</h3></div>

      <ul class="list-group">
         {notes_list}
      </ul>

      <div class="login-or">
        <hr class="hr-or"/>
      </div>

      <div>
        <h5> Upload New Lecture Notes </h5>
        <FileUpload  userid={this.state.pname} cid={this.state.cid} axiosPath='uploadnotes' uploadHandler={this.newNotesUploadHandler} taskname='Notes Name'/>
      </div>


    </div>

    <div class="login-or">
        <hr class="hr-or"/>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading"><h3>Assignments</h3></div>

      <ul class="list-group">
         {assign_list}
      </ul>

      <div class="login-or">
        <hr class="hr-or"/>
      </div>

      <div>
        <h5> Upload New Assignments </h5>
        <FileUpload  userid={this.state.pname} cid={this.state.cid} axiosPath='uploadassign' uploadHandler={this.newAssignUploadHandler} taskname='Assignment Name'/>
      </div>


    </div>

    <div class="login-or">
        <hr class="hr-or"/>
    </div>


    <div class="panel panel-primary">
      <div class="panel-heading"><h3>Quiz</h3></div>

      <ul class="list-group">
        {quiz_list}
      </ul>
          <div class="login-or">
             <hr class="hr-or"/>
          </div>
      <a>
			    <button  onClick={() => this.setState({newQuiz : true})} className="btn btn-danger">Add New Quiz</button>
		  </a>
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


export default connect(mapStateToProps, null)(Course);