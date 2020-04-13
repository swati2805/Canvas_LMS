import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class SubmitA extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			uploadStatus: false,
			fileURL: '',
			selectedFile: '',
			AssignName: '',
			cid: '',
			pname: '',
		  }
		this.handleUpload = this.handleUpload.bind(this);
		this.handleselectedFile = this.handleselectedFile.bind(this);
	  }
	

		componentWillMount(){
			
			if(this.props.location.state != undefined){	
				console.log(this.props.location.state.id);	
				var myObj = JSON.parse(this.props.location.state.id);
				this.setState({
							cid : myObj.cid,
							pname : myObj.pname,
							AssignName : myObj.AssignName
							
							})
			} else {
				var myObj = {cid: "DefaultInput", pname : "Default",  AssignName : "Default"};
					this.setState({
						pname :this.props.logininfo.result.username
		    });
			}
	
		}	



	handleselectedFile = (event) => {
		this.setState({
		  selectedFile: event.target.files[0],
		})
	}

	handleUpload = () => {
		const data = new FormData()
		data.append('file', this.state.selectedFile, this.state.selectedFile.name)
		data.append('userid', this.state.pname)
		data.append('cid', this.state.cid)
		data.append('AssignName', this.state.AssignName)
	
    var axiosPath = "http://localhost:3001/submitassign";
	  axios.defaults.withCredentials = true;
		axios.post(axiosPath, data)
		.then(response => {
			console.log("File Upload Status Code : ",response.status);
			console.log("File Upload Status Data : ",response.data);
			console.log("File Upload Status Data : ",response.data.file);
			var tempFilePath = "http://localhost:3001/"+response.data.file;
			if(response.status === 200){
				this.setState({ fileURL: tempFilePath, uploadStatus: true });
			}else{
				this.setState({
					uploadStatus : false
				})
			}
		});

				

	  }
	

   render(){
	console.log("FILE PATH: "+this.state.fileURL);
	let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
      console.log("Cant load cookie at sumitA page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.uploadStatus){
      console.log("uploadStatus is done. Going back to home page");
      redirectVar = <Redirect to= "/home"/>
  }

	 return(
    <div>
    {redirectVar}


	<div class="container">

	<div class="panel panel-danger">
      <div class="panel-heading"><h3>Submit Assignment: {this.state.AssignName} for Course: {this.state.cid}</h3></div>

			
			<div class="login-or">
        <hr class="hr-or"/>
    	</div>
			
			<div className="file_uploader">
	 		<input type="file" name="" id="" onChange={this.handleselectedFile} />
	 		<button  className="btn btn-success pull-right" onClick={this.handleUpload}>Submit</button>

   	</div>

    </div>


	</div>


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

export default connect(mapStateToProps, null)(SubmitA);