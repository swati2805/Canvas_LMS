import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class ProvideCode extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			gohome: false,
			AddedtoDB : false,
			studentName : '',
			code : '',
			cid: ''
			}
		
	  }
	
		componentWillMount(){
			
			if(this.props.location.state != undefined){	
				console.log(this.props.location.state.id);	
				var myObj = JSON.parse(this.props.location.state.id);
				this.setState({
							cid : myObj.cid,
							})
			} else {
				var myObj = {cid: "DefaultInput", pname : "Default"};
			}
	
		}	


	addCode = (e) => {
		//prevent page from refresh
		e.preventDefault();
		var code1 =  Math.floor((Math.random() * 999999) + 100000);
		console.log("Code: "+code1);
		this.setState({
			code : code1
		})
		const data = {
				cid : this.state.cid,
				studentName : this.state.studentName,
				code : code1
		}
		//set the with credentials to true
		axios.defaults.withCredentials = true;
		//make a post request with the user data
		axios.post('http://localhost:3001/addcode',data)
				.then(response => {
						console.log("Status Code : ",response.status);
						if(response.status === 200){
								this.setState({
									AddedtoDB : true
								})
						}else{
								this.setState({
									AddedtoDB : false
								})
						}
				});
}

render(){


	let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag ){
      console.log("Cant load cookie at Grade page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag  && this.state.gohome){
      console.log("Grading is done. Going back to home page");
      redirectVar = <Redirect to= "/home"/>
	}
	if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag  && this.state.AddedtoDB){
    console.log("AddedtoDB is set. Going to home");
    redirectVar = <Redirect to= "/home"/>
  }

	 return(
    <div>
    {redirectVar}

		<div class="panel panel-primary">
      <div class="panel-heading"><h3>Provide Enrollment Permission Code for Course: {this.state.cid}</h3></div>

	<div class="container">
      <div class="container">
	  
	  <form action="http://127.0.0.1:3000/addcode" method="post">
		<div class="form-row">
			<div class="form-group" >
				<label for="inputEmail4">Student Name</label>
				<input onChange = {(e) => this.setState({studentName:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Student Name"/>
			</div>
		</div>
		<div class="form-row">
         <div class="bottom-right">
					<button  onClick = {this.addCode} type="submit" class="btn btn-success pull-right">Generate And Send Permission Code</button>
	     </div>
		</div>	
		</form>
  </div>
	

	</div>

  
	</div>
	<button  onClick={() => this.setState({gohome: true})} className="btn btn-danger">Back to Home</button>
	</div>

	 )

   }




 }

  //This method is provided by redux and it gives access to centeral store
function mapStateToProps(state) {
    return { logininfo : state.logininfo };
}

//export Home Component
//export default HomeS;

export default connect(mapStateToProps, null)(ProvideCode);

