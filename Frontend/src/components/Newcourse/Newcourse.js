import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class Newcourse extends Component {
  constructor(props){
    super(props);
    this.state={
      CourseId:'',
      CourseName:'',
      CourseDept:'',
      CourseDescription:'',
	  CourseRoom: '',
	  CourseCapacity: '',
	  WaitlistCapacity: '',
	  CourseTerm: '',
	  authFlag: false
	  
    }
  }
  
  	addNewCourse = (s) => {
		s.preventDefault();
		const data = {
			CourseId:   this.state.CourseId ,
			CourseName: this.state.CourseName,
			CourseDept: this.state.CourseDept,
			CourseDescription: this.state.CourseDescription,
			CourseRoom: this.state.CourseRoom,
			CourseCapacity: this.state.CourseCapacity,
			WaitlistCapacity: this.state.WaitlistCapacity,
			CourseTerm: this.state.CourseTerm,
            Faculty: this.props.logininfo.result.username	
		}
		console.log(data);
		//set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/newcourse',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
					console.log("New Course " + this.state.CourseId +" added successfully");
                    this.setState({
                        authFlag : true
                    })
					
                }else{
                    this.setState({
                        authFlag : false
                    })
					console.log("New Course could Not be added");
                }
            });
	}
  
  
  
  render() {
	  
		//redirect based on valid user login
        let redirectVar = null;

	    if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.authFlag){
			redirectVar = <Redirect to= "/home"/>
		} 
		if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag ){
            redirectVar = <Redirect to= "/login"/>
        }
		
    return (
	
 <div>
		{redirectVar}
		
      <div class="container">
	  
	  <form action="http://127.0.0.1:3000/newcourse" method="post">
		<div class="form-row">
			<div class="form-group  col-md-6" >
				<label for="inputEmail4">Course Id</label>
				<input onChange = {(e) => this.setState({CourseId:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="CourseId"/>
			</div>
			<div class="form-group  col-md-6">
				<label for="inputPassword4">Course Name</label>
				<input onChange = {(e) => this.setState({CourseName:e.target.value})} type="lastname" class="form-control" id="inputPassword4" placeholder="CourseName"/>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputEmail4">Course Dept</label>
				<input onChange = {(e) => this.setState({CourseDept:e.target.value})} type="email" class="form-control" id="inputEmail4" placeholder="CourseDept"/>
			</div>
			<div class="form-group  col-md-6">
				<label for="inputPassword4">Course Description</label>
				<input onChange = {(e) => this.setState({CourseDescription:e.target.value})} type="email" class="form-control" id="inputPassword4" placeholder="CourseDescription"/>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputEmail4">Course Room</label>
				<input onChange = {(e) => this.setState({CourseRoom:e.target.value})} type="email" class="form-control" id="inputEmail4" placeholder="CourseRoom"/>
			</div>
			<div class="form-group  col-md-6">
				<label for="inputPassword4">Course Capacity</label>
				<input onChange = {(e) => this.setState({CourseCapacity:e.target.value})} type="gender" class="form-control" id="inputPassword4" placeholder="CourseCapacity"/>
			</div>
		</div>		
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputCity">Waitlist Capacity</label>
				<input  onChange = {(e) => this.setState({WaitlistCapacity:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="WaitlistCapacity"/>
			</div>
			<div class="form-group  col-md-6">
				<label for="inputCity">Course Term</label>
				<input  onChange = {(e) => this.setState({CourseTerm:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="CourseTerm"/>
			</div>
		</div>	
		<div class="form-row">
         <div style={{width: '30%'}} class="bottom-right">
			<button  onClick = {this.addNewCourse} type="submit" class="btn btn-primary  col-md-6">Create Course</button>
	     </div>
		</div>			

	</form>

 </div>
 </div>
    );
  }
}


  //This method is provided by redux and it gives access to centeral store
function mapStateToProps(state) {
    return { logininfo : state.logininfo };
}


export default connect(mapStateToProps, null)(Newcourse);