import React, { Component } from 'react';
import axios from 'axios';
class Signup extends Component {
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
	  about_me: ''
	  
    }
  }
  render() {
    return (
      <div class="container">
	  
	  <form action="http://127.0.0.1:3000/signup" method="post">
		<div class="form-row">
			<div style={{width: '30%'}} class="form-group">
				<label for="inputEmail4">First Name</label>
				<input onChange = {(e) => this.setState({first_name:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="First Name"/>
			</div>
			<div style={{width: '30%'}} class="form-group">
				<label for="inputPassword4">Last Name</label>
				<input onChange = {(e) => this.setState({last_name:e.target.value})} type="lastname" class="form-control" id="inputPassword4" placeholder="Last Name"/>
			</div>
		</div>
		<div class="form-row">
			<div style={{width: '30%'}} class="form-group">
				<label for="inputEmail4">Email</label>
				<input onChange = {(e) => this.setState({email:e.target.value})} type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
			</div>
			<div style={{width: '30%'}} class="form-group">
				<label for="inputPassword4">Password</label>
				<input onChange = {(e) => this.setState({password:e.target.value})} type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
			</div>
		</div>
		<div class="form-row">
			<div style={{width: '30%'}} class="form-group">
				<label for="inputEmail4">Phone Number</label>
				<input onChange = {(e) => this.setState({phone_number:e.target.value})} type="email" class="form-control" id="inputEmail4" placeholder="Phone Number"/>
			</div>
			<div style={{width: '30%'}} class="form-group">
				<label for="inputPassword4">Gender</label>
				<input onChange = {(e) => this.setState({gender:e.target.value})} type="password" class="form-control" id="inputPassword4" placeholder="Gender"/>
			</div>
		</div>		
		<div class="form-row">
			<div style={{width: '30%'}} class="form-group">
				<label for="inputCity">City</label>
				<input  onChange = {(e) => this.setState({city:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="City"/>
			</div>
			<div style={{width: '30%'}} class="form-group">
				<label for="inputCity">Country</label>
				<input  onChange = {(e) => this.setState({country:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="Country"/>
			</div>
		</div>
		<div class="form-row">
			<div style={{width: '30%'}} class="form-group">
				<label for="inputCity">Home Town</label>
				<input  onChange = {(e) => this.setState({hometown:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="Home Town"/>
			</div>
			<div  style={{width: '30%'}} class="form-group">
				<label for="inputCity">Campany</label>
				<input  onChange = {(e) => this.setState({company:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="Company"/>
			</div>
		</div>	
		<div class="form-row">
			<div style={{width: '30%'}} class="form-group">
				<label for="inputCity">School</label>
				<input  onChange = {(e) => this.setState({school:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="School"/>
			</div>
			<div  style={{width: '30%'}} class="form-group">
				<label for="inputCity">Languages</label>
				<input  onChange = {(e) => this.setState({languages:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="Langauges"/>
			</div>
		</div>	
		<div class="form-row">
			<div style={{width: '30%'}} class="form-group">
				<label for="inputCity">About Me</label>
				<input  onChange = {(e) => this.setState({about_me:e.target.value})} type="text" class="form-control" id="inputCity" placeholder="About Me"/>
			</div>
		</div>			
         <div style={{width: '30%'}} class="bottom-right">
			<button type="submit" class="btn btn-primary">Submit</button>
	     </div>
	</form>

 </div>
    );
  }
}


export default Signup;