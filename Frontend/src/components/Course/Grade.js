import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class Grade extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			gohome: false,
			submissions: 'NO_ASSIGNMENTS_YET',
			cid: '',
			pname: '',
			AssignName: 'DEFAULT',
			gradesMap: [],
			}
		
	  }
	

		componentWillMount(){
			
			if(this.props.location.state != undefined){	
				console.log(this.props.location.state.id);	
				var myObj = JSON.parse(this.props.location.state.id);
				this.setState({
							cid : myObj.cid,
							AssignName : myObj.AssignName
							
							})
			} else {
				var myObj = {cid: "DefaultInput", AssignName : "Default"};
				this.setState({ pname : this.props.logininfo.result.username});
			}
	
		}	

	componentDidMount(){
			console.log('Component Did Mount of Grade');
			const data = {cid: this.state.cid, AssignName: this.state.AssignName};
			console.log("Grade DID: Data: "+data);
			axios.defaults.withCredentials = true;
			axios.post('http://localhost:3001/grade/',data)
					.then(response =>{
							if(response.status === 200){
									console.log(response.data);
									this.setState({
											submissions: response.data,
											viewStatus: true
									})
									console.log("GOT Response in viewa post: "+this.state.submissions);				
							}
					});
	}
	
	handleClick = (param) => (e) => { 
		console.log('Grades', e.target.value);
		console.log('StudentName', param);
		const data = {"grade" : e.target.value, "pname" : param, "AssignName" : this.state.AssignName, "cid" : this.state.cid};

		var valuex = e.target.value;
		this.setState(prevState => ({
			gradesMap: [...prevState.gradesMap, {"pname" : param, "grade" : valuex, "submitted" : false}]
		}))
		console.log("GRADE MAP: "+this.state.gradesMap);	
		
		console.log("Grade Data: "+data);

		axios.defaults.withCredentials = true;
		axios.post('http://localhost:3001/submitgrades/',data)
				.then(response =>{
						if(response.status === 200){
								console.log(response.data);
								this.setState(prevState => ({
									gradesMap: [...prevState.gradesMap, {"pname" : param, "grade" : valuex, "submitted" : true}]
								}))		
						}
				});	

	}

render(){


	console.log("Grade Assignments to view: "+this.state.submissions);
	console.log("Grade Map at Render: "+JSON.stringify(this.state.gradesMap));
	let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag ){
      console.log("Cant load cookie at Grade page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag  && this.state.gohome){
      console.log("Grading is done. Going back to home page");
      redirectVar = <Redirect to= "/home"/>
	}
	
  
	let assign_list = null;
  if(this.state.submissions !== 'NO_ASSIGNMENTS_YET') {
    assign_list = this.state.submissions.map(a => {
      var tempFilePath = `http://localhost:3001/uploads/assignments/${a.FileName}`
      console.log("Assign File Path: "+tempFilePath);
      return ( 
            <div key={a.AssignName}>
                  <li class="list-group-item list-group-item-warning">Student: {a.Student}
                        <a href={tempFilePath} download>
			               			<button  className="btn btn-success pull-right">Download/View</button>
		                		</a>
												<div class="form-group" >
													<label for="inputEmail4">Grade</label>
													<input onChange = {this.handleClick(a.Student)} type="firstname" class="form-control" id="inputEmail4" placeholder="Grade"/>
												</div>
                  </li>
                  
            </div>
      )
    });
  }

	 return(
    <div>
    {redirectVar}


	<div class="container">
	<div class="panel panel-primary">
      <div class="panel-heading"><h3>Submissions for Assignment Name:  {this.state.AssignName}, Course: {this.state.cid}</h3></div>

      <ul class="list-group">
         {assign_list}
      </ul>

      <a>
			
	  </a>

	<button  onClick={() => this.setState({gohome: true})} className="btn btn-primary">Upload Grades</button>
	
	</div>

	<button  onClick={() => this.setState({gohome: true})} className="btn btn-danger">Back to Home</button>

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

export default connect(mapStateToProps, null)(Grade);

 

/*<form action="http://127.0.0.1:3000/sendgrades" method="post">
<div class="form-row">
	<div class="form-group  col-md-6" >
		<label for="inputEmail4">Grade</label>
		<input onChange = {(e) => this.setState({first_name:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="First Name"/>
	</div>
	<div class="form-group  col-md-6">
		<label for="inputPassword4">Password</label>
		<input onChange = {(e) => this.setState({password:e.target.value})} type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
	</div>
</div>
<div class="form-row">
		 <div style={{width: '30%'}} class="bottom-right">
	<button  onClick = {this.addNewUser} type="submit" class="btn btn-primary  col-md-6">Submit Grades</button>
	 </div>
</div>			

</form>*/