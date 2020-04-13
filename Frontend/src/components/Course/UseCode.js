import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";


class UseCode extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			gohome: false,
			codeCheckDone : false,
			addedToCourse : false,
			pname : '',
			cid : '',
			code : '',

			}
		
	  }
	
		componentWillMount(){
			
			if(this.props.location.state != undefined){	
				console.log(this.props.location.state.id);	
				var myObj = JSON.parse(this.props.location.state.id);
				this.setState({
							pname : myObj.pname,
							})
			} else {
				var myObj = {pname : "Default"};
				this.setState({
						pname :this.props.logininfo.result.username
		    });
			}
	
		}	


checkCode = (e) => {
		//prevent page from refresh
		e.preventDefault();

		const data = {
				cid : this.state.cid,
				pname : this.state.pname,
				code : this.state.code
		}

		console.log("Sending to check: "+data);
		//set the with credentials to true
		axios.defaults.withCredentials = true;
		//make a post request with the user data
		axios.post('http://localhost:3001/codecheck',data)
				.then(response => {
						console.log("Status Code : ",response.status);
						if(response.status === 200){
								this.setState({
									codeCheckDone : true
								})
						}else{
								this.setState({
									codeCheckDone : false
								})
						}
				});
}

addCourse = (e) => {
	e.preventDefault();
	const data = {
		cid : this.state.cid,
		pname : this.state.pname,
	}		

	if(this.state.codeCheckDone) {
	console.log("Course and User Selected: "+data.cid+", "+data.pname);
	axios.defaults.withCredentials = true;
	axios.post('http://localhost:3001/addcourse_withcode/',data)
			.then(response =>{
					if(response.status === 200){
							console.log("GOT Response in addcourse post: "+response.status);
							this.setState({
								addedToCourse : true
							});
					} else {
						this.setState({
							addedToCourse : false
						});
							
					}
			});

	} else {
		console.log("Code checking has NOT COMPLETED!!")
	}

}

render(){


	let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag ){
      console.log("Cant load cookie at UseCode page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag  && this.state.gohome){
      console.log("Grading is done. Going back to home page");
      redirectVar = <Redirect to= "/home"/>
	}
	if( this.props.logininfo.result &&  this.props.logininfo.result.authFlag  && this.state.addedToCourse){
    console.log("addedToCourse is set. Going to home");
    redirectVar = <Redirect to= "/home"/>
	}
	
	var addC = null;
	if(this.state.codeCheckDone) {
		addC = <button  onClick = {this.addCourse} type="submit" class="btn btn-success">Add Course</button>
	}



	 return(
    <div>
    {redirectVar}

		<div class="panel panel-primary">
      <div class="panel-heading"><h3>Use permission code to enroll for : {this.state.pname}</h3></div>

	<div class="container">
      <div class="container">
	  
	  <form action="http://127.0.0.1:3000/checkcode" method="post">
		<div class="form-row">
			<div class="form-group" >
				<label for="inputEmail4">Enter Course Id</label>
				<input onChange = {(e) => this.setState({cid:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Course Id"/>
			</div>
			<div class="form-group" >
				<label for="inputEmail4">Enter Code Provided by Faculty</label>
				<input onChange = {(e) => this.setState({code:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Code"/>
			</div>
		</div>
		<div class="form-row">
         <div class="bottom-right">
					<button  onClick = {this.checkCode} type="submit" class="btn btn-success">Check Permission Code</button>
	     </div>
		</div>	
		</form>
		<div class="login-or">
        <hr class="hr-or"/>
    </div>
		<div class="input-group mb-3">
  	<div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">Code Check Status</span>
  	</div>
  	<input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={this.state.codeCheckDone}  readonly/>
		</div>
		<div class="login-or">
        <hr class="hr-or"/>
    </div>

     <form>
		<div class="form-row">
         <div class="bottom-right">
					{addC}
	     </div>
		</div>	
		</form>

  </div>
	

	</div>

  
	</div>
	<button  onClick={() => this.setState({gohome: true})} className="btn btn-danger pull-right">Back to Home</button>
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

export default connect(mapStateToProps, null)(UseCode);

