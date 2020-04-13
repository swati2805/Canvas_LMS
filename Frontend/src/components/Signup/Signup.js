import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addUser } from "../../actions";


class Signup extends Component {


 constructor(props){
    super(props);
    this.state={
		selectedFile: '',
		first_name: '',
		}

		this.handleselectedFile= this.handleselectedFile.bind(this);

  }	

  //Define component that you wanbt to render
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  /*Action call
  Whenever onSubmit event is triggered, execute an action call called createBook 
  */
  onSubmit(values) {
		console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIII OnSubmit")
    console.log(values);
    console.log("First Name for PIC: "+values.first_name)

		const data = new FormData()
		data.append('file', this.state.selectedFile, this.state.selectedFile.name)
		data.append('first_name', values.first_name)

		//set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/setpic',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
					console.log("Pic " + this.state.selectedFile.name +" added successfully");

                }else{
					console.log("Pic Could Not be added");
                }
            });

    this.props.addUser(values, () => {
      this.props.history.push("/login");
    });
  }

  	handleselectedFile = (event) => {
		this.setState({
		  selectedFile: event.target.files[0],
		})
	}

  
  render() {
	  
		//redirect based on valid user login
        let redirectVar = null;

	    if(this.props.newuserinfo.authFlag){
			redirectVar = <Redirect to= "/login"/>
		} 
		if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag ){
            redirectVar = <Redirect to= "/home"/>
				}
				
		const { handleSubmit } = this.props;		
		
    return (
	
			<div>
			{redirectVar}
			
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      
			<Field
				label="First Name"
				name="first_name"
				component={this.renderField}
			/>

			<Field
				label="Last Name"
				name="last_name"
				component={this.renderField}
			/>
			<Field
				label="Email"
				name="email"
				component={this.renderField}
			/>
			<Field
				label="Password"
				name="password"
				component={this.renderField}
			/>
			<Field
				label="Phone Number"
				name="phone_number"
				component={this.renderField}
			/>
			<Field
				label="Gender"
				name="gender"
				component={this.renderField}
			/>
			<Field
				label="City"
				name="city"
				component={this.renderField}
			/>
			<Field
				label="Country"
				name="country"
				component={this.renderField}
			/>
			<Field
				label="Home Town"
				name="hometown"
				component={this.renderField}
			/>
			<Field
				label="Company"
				name="company"
				component={this.renderField}
			/>
			<Field
				label="School"
				name="school"
				component={this.renderField}
			/>			
			<Field
			label="Languages"
			name="languages"
			component={this.renderField}
			/>
			<Field
				label="About Me"
				name="about_me"
				component={this.renderField}
			/>
			<Field
				label="SignUp As (Put student Or faculty)"
				name="ptype"
				component={this.renderField}
			/>
			<div className="file_uploader">
			  <label for="signuptype">Add Profile Picture</label>
	 			<input type="file" name="" id="" onChange={this.handleselectedFile} />
   		    </div>
			<button type="submit" className="btn btn-primary">Submit</button>
			<Link to="/login" className="btn btn-danger">Cancel</Link>
		</form>

</div>

    );
  }
}

function validate(values) {

  const errors = {};

  // Validate the inputs from 'values'
  if (!values.first_name) {
    errors.first_name = "Enter first name";
  }
  if (!values.last_name) {
    errors.last_name = "Enter last name";
  }
  if (!values.email) {
    errors.email = "Enter email";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

//This method is provided by redux and it gives access to centeral store
function mapStateToProps(state) {
  return { newuserinfo : state.newuserinfo,
  			logininfo : state.logininfo};
}


export default reduxForm({
  validate,
  form: "NewUserForm"
})(connect(mapStateToProps, { addUser })(Signup));

