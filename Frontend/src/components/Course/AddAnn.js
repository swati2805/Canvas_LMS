import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class AddAnn extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			gohome: false,
			AddedtoDB : false,
			cid: '',
			pname: '',
			annTitle: 'DEFAULT',
			annContent: '',
			}
		
	  }
	
		componentWillMount(){
			
			if(this.props.location.state != undefined){	
				console.log(this.props.location.state.id);	
				var myObj = JSON.parse(this.props.location.state.id);
				this.setState({
							cid : myObj.cid,
							pname : myObj.pname
							
							})
			} else {
				var myObj = {cid: "DefaultInput", pname : "Default"};
				this.setState({ pname : this.props.logininfo.result.username});
			}
	
		}	


	addAnn = (e) => {
		//prevent page from refresh
		e.preventDefault();
		const data = {
				cid : this.state.cid,
				annTitle : this.state.annTitle,
				annContent : this.state.annContent
		}
		//set the with credentials to true
		axios.defaults.withCredentials = true;
		//make a post request with the user data
		axios.post('http://localhost:3001/addann',data)
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
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
      console.log("Cant load cookie at Grade page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.gohome){
      console.log("Grading is done. Going back to home page");
      redirectVar = <Redirect to= "/home"/>
	}
	if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.AddedtoDB){
    console.log("AddedtoDB is set. Going to home");
    redirectVar = <Redirect to= "/home"/>
  }

	 return(
    <div>
    {redirectVar}

		<div class="panel panel-primary">
      <div class="panel-heading"><h3>Add New Accouncement</h3></div>

	<div class="container">
      <div class="container">
	  
	  <form action="http://127.0.0.1:3000/addann" method="post">
		<div class="form-row">
			<div class="form-group" >
				<label for="inputEmail4">Accouncement Title</label>
				<input onChange = {(e) => this.setState({annTitle:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Accouncement Title"/>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group" >
				<label for="inputEmail4">Accouncement Content</label>
				<input onChange = {(e) => this.setState({annContent:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Accouncement Content"/>
			</div>
		</div>
		<div class="form-row">
         <div class="bottom-right">
					<button  onClick = {this.addAnn} type="submit" class="btn btn-success pull-right">Submit</button>
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

export default connect(mapStateToProps, null)(AddAnn);

