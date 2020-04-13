import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { checkUser } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//Define a Login Component
class Login extends Component{


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

       //Define component that you wanbt to render
       renderField1(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input className="form-control" type="password" {...field.input} />
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
		console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIII OnSubmit at login")
    console.log(values);
    var data = {
        username: values.username,
        password: values.password
    }
    this.props.checkUser(data);
  }


    render(){
        //redirect based on successful login
        let redirectVar = null;
   if (this.props.logininfo.result) {
		
        console.log("Login Render0 :"+this.props.logininfo);
        console.log("Login Render1 :"+this.props.logininfo.result);
        console.log("Login Render2 :"+this.props.logininfo.result.authFlag);
        console.log("Login Render3 :"+this.props.logininfo.result.username);
        console.log("Login Render4 :"+this.props.logininfo.result.password);
			
        //if(cookie.load('cookie')){
			      //console.log("Not Able to read cookie login");
            //redirectVar = <Redirect to={{
						//		pathname: '/home',
						//		state: { id: text}
						//  }} />
        //}
    }
	    if(this.props.logininfo.result && this.props.logininfo.result.authFlag){
            var textObj = { pname: this.props.logininfo.result.username };
            var text = 	JSON.stringify(textObj);
            console.log("Able to read cookie login");
            var textObj = { pname: this.props.logininfo.result.username };
            var text = 	JSON.stringify(textObj);  
            console.log("login sending to home with "+text);
		      	redirectVar = <Redirect to={{
								pathname: '/home',
								state: { id: text}
						  }} />
        } 
        
        const { handleSubmit } = this.props;		

        return(
            <div>
                {redirectVar}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Canvas Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      
      <Field
          label="User Name"
          name="username"
          component={this.renderField}
      />

      <Field
          label="Password"
          name="password"
          component={this.renderField1}
      />
			<button type="submit" className="btn btn-primary">Login</button>
		</form>

							<div class="col-md-12 ">
                               <div class="login-or">
                                     <hr class="hr-or"/>
                                        <span class="span-or">Or</span>	
									 <hr class="hr-or"/>
                               </div>
                            </div>
							<a class="btn btn-primary" href="/signup" role="button">Sign-up</a>

                            						
							
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

function validate(values) {

    const errors = {};
  
    // Validate the inputs from 'values'
    if (!values.username) {
      errors.first_name = "Enter user name";
    }
    if (!values.password) {
      errors.last_name = "Enter password";
    }
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }
  
  //This method is provided by redux and it gives access to centeral store
  function mapStateToProps(state) {
    return { logininfo : state.logininfo };
  }
  
  
  export default reduxForm({
    validate,
    form: "loginForm"
  })(connect(mapStateToProps, { checkUser })(Login));
  
