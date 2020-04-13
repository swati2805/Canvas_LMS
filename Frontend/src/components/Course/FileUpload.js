import React, {Component} from 'react';
import axios from 'axios';

class FileUpload extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			uploadStatus: false,
			fileURL: '',
			selectedFile: '',
			AssignName: '',
		  }
		this.handleUpload = this.handleUpload.bind(this);
		this.handleselectedFile = this.handleselectedFile.bind(this);
	  }
	
	handleselectedFile = (event) => {
		this.setState({
		  selectedFile: event.target.files[0],
		})
	}

	handleUpload = () => {
		const data = new FormData()
		data.append('file', this.state.selectedFile, this.state.selectedFile.name)
		data.append('userid', this.props.userid)
		data.append('cid', this.props.cid)
		data.append('AssignName', this.state.AssignName)
	
    var axiosPath = "http://localhost:3001/"+this.props.axiosPath;
	  axios.defaults.withCredentials = true;
		axios.post(axiosPath, data)
		.then(response => {
			console.log("File Upload Status Code : ",response.status);
			console.log("File Upload Status Data : ",response.data);
			console.log("File Upload Status Data : ",response.data.file);
			var tempFilePath = "http://localhost:3001/"+response.data.file;
			if(response.status === 200){
				this.setState({ fileURL: tempFilePath, uploadStatus: true });
				this.props.uploadHandler();
			}else{
				this.setState({
					uploadStatus : false
				})
			}
		});

				

	  }
	

   render(){
	console.log("FILE PATH: "+this.state.fileURL);

	 return(

	<div class="container">

		<form>
		<div class="form-row">
			<div class="form-group  col-md-6" >
				<label for="inputEmail4">Name:</label>
				<input onChange = {(e) => this.setState({AssignName:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder={this.props.taskname}/>
			</div>
		</div>
		</form>

	 	<div className="file_uploader">
	 		<input type="file" name="" id="" onChange={this.handleselectedFile} />
	 		<button  className="btn btn-danger" onClick={this.handleUpload}>Upload</button>
   		</div>

	</div>

	 )

   }




 }

export default FileUpload;