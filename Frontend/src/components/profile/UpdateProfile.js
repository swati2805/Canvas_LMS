import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile } from "../../actions";
import { updateProfile } from "../../actions";

class UpdateProfile extends Component {

  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
	  city: '',
	  gender: '',
	  phone_number: '',
	  school: '',
	  hometown: '',
	  company: '',
	  languages: '',
	  country: '',
	  about_me: '',
		authFlag: false
	  
		}

	}

async componentDidMount() {
		const data = {"pname" : this.props.logininfo.result.username };
		await this.props.getProfile(data);
		this.setState({
			first_name: this.props.profileinfo.first_name,
			last_name: this.props.profileinfo.last_name,
			email: this.props.profileinfo.email,
			city: this.props.profileinfo.city,
			gender: this.props.profileinfo.gender,
			phone_number: this.props.profileinfo.phone_number,
			school: this.props.profileinfo.school,
			hometown: this.props.profileinfo.hometown,
			company: this.props.profileinfo.company,
			languages: this.props.profileinfo.languages,	
			country: this.props.profileinfo.country,
			about_me: this.props.profileinfo.about_me,
			authFlag: this.props.profileinfo.authFlag
			
	})	
}

  
updateUser = (s) => {
		s.preventDefault();
		const data = {
		   'first_name': this.state.first_name,
			'last_name' :  this.state.last_name,
			'email' :     this.state.email,
			'password' :  this.state.password,
			'city' :  this.state.city,
			'gender' :     this.state.gender,
			'phone_number' :  this.state.phone_number,
			'school' :    this.state.school,
			'hometown' :  this.state.hometown,
			'company' :   this.state.company,
			'languages' : this.state.languages,
			'country' :this.state.country,
			'about_me' : this.state.about_me,
		}
			
		console.log(data);
		this.props.updateProfile(data, () => {
      this.props.history.push("/home");
    });

	}
  

	
  
  render() {
	  
		//redirect based on valid user login
        let redirectVar = null;

		if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag ){
            redirectVar = <Redirect to= "/login"/>
		}
	
		
    return (
	
 <div>
		{redirectVar}
		
		<div class="panel panel-primary">
      <div class="panel-heading"><h3>Update Details</h3></div>


			<form action="http://127.0.0.1:3000/updateprofile" method="post">
		<div class="form-row">
			<div class="form-group  col-md-6" >
				<label for="inputEmail4">First Name</label>
				<input onChange = {(e) => this.setState({first_name:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="First Name" value={this.state.first_name}/>
			</div>
			<div class="form-group  col-md-6">
				<label for="inputPassword4">Last Name</label>
				<input onChange = {(e) => this.setState({last_name:e.target.value})} type="lastname" class="form-control" id="inputPassword4" placeholder="Last Name" value={this.state.last_name}/>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputEmail4">Email</label>
				<input onChange = {(e) => this.setState({email:e.target.value})} type="email" class="form-control" id="inputEmail4" placeholder="Email" value={this.state.email}/>
			</div>
			<div class="form-group  col-md-6">
				<label for="inputPassword4">Password</label>
				<input onChange = {(e) => this.setState({password:e.target.value})} type="password" class="form-control" id="inputPassword4" placeholder="Password" value={this.state.password}/>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputEmail4">Phone Number</label>
				<input onChange = {(e) => this.setState({phone_number:e.target.value})} type="email" class="form-control" id="inputEmail4" placeholder="Phone Number" value={this.state.phone_number}/>
			</div>
			<div class="form-group  col-md-6">
				<label for="inputPassword4">Gender</label>
				<input onChange = {(e) => this.setState({gender:e.target.value})} type="gender" class="form-control" id="inputPassword4" placeholder="Gender" value={this.state.gender}/>
			</div>
		</div>		
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputCity">City</label>
				<input  onChange = {(e) => this.setState({city:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="City" value={this.state.city}/>
			</div>
			<div class="form-group  col-md-6">
				<label for="inputCity">Country</label>
				<input  onChange = {(e) => this.setState({country:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="Country" value={this.state.country}/>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputCity">Home Town</label>
				<input  onChange = {(e) => this.setState({hometown:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="Home Town" value={this.state.hometown}/>
			</div>
			<div  class="form-group  col-md-6">
				<label for="inputCity">Campany</label>
				<input  onChange = {(e) => this.setState({company:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="Company" value={this.state.company}/>
			</div>
		</div>	
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputCity">School</label>
				<input  onChange = {(e) => this.setState({school:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="School" value={this.state.school}/>
			</div>
			<div  class="form-group  col-md-6">
				<label for="inputCity">Languages</label>
				<input  onChange = {(e) => this.setState({languages:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="Langauges" value={this.state.languages}/>
			</div>
		</div>	
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputCity">About Me</label>
				<input  onChange = {(e) => this.setState({about_me:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="About Me" value={this.state.about_me}/>
			</div>

			
		</div>	
		<div class="login-or">
        <hr class="hr-or"/>
    </div>
		<div class="form-row">





		</div>			

	</form>


				<div class="login-or">
       		 <hr class="hr-or"/>
    		</div>
				<a>
			    <button  onClick={this.updateUser} className="btn btn-lg btn-primary">Update Profile</button>
		 		 </a>
			</div>			
 </div>
    );
  }
}


const mapStateToProps = state => ({
	profilestore : state.profilestore,
	profileinfo : state.profileinfo,
	logininfo : state.logininfo
})

//export default Profile;
export default connect(mapStateToProps, { getProfile, updateProfile })(UpdateProfile);
