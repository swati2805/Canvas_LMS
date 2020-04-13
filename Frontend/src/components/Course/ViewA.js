import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class ViewA extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			viewStatus: false,
			gohome: false,
			assignments: 'NO_ASSIGNMENTS_YET',
			cid: '',
			pname: '',
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
				this.setState({
						pname :this.props.logininfo.result.username
		    });
			}
	
		}	

	componentDidMount(){
			console.log('Component Did Mount of ViewA');
			const data = {cid: this.state.cid, pname: this.state.pname};
			console.log("ViewA DID: Data: "+data);
			axios.defaults.withCredentials = true;
			axios.post('http://localhost:3001/viewassign/',data)
					.then(response =>{
							if(response.status === 200){
									console.log(response.data);
									this.setState({
											assignments: response.data,
											viewStatus: true
									})
									console.log("GOT Response in viewa post: "+this.state.assignments);				
							}
					});
	}
	
	

render(){


	console.log("ViewA Assignments to view: "+this.state.assignments);
	let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag ){
      console.log("Cant load cookie at sumitA page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag  && this.state.gohome){
      console.log("view is done. Going back to home page");
      redirectVar = <Redirect to= "/home"/>
	}
	
  
	let assign_list = null;
  if(this.state.assignments !== 'NO_ASSIGNMENTS_YET') {
    assign_list = this.state.assignments.map(a => {
      var tempFilePath = `http://localhost:3001/uploads/assignments/${a.FileName}`
      console.log("Assign File Path: "+tempFilePath);
      return ( 
            <div key={a.AssignName}>
									<li class="list-group-item list-group-item-warning">{a.AssignName}
			               			<button  className="btn btn-info pull-right">Grade: {a.Grade}</button>
                        <a href={tempFilePath} download>
			               			<button  className="btn btn-success pull-right">Download/View</button>
		                		</a>
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
      <div class="panel-heading"><h3>Submitted Assignments for Course: {this.state.cid} by Student: {this.state.pname}</h3></div>

      <ul class="list-group">
         {assign_list}
      </ul>

      <a>
			<button  onClick={() => this.setState({gohome: true})} className="btn btn-danger">Back to Home</button>
	  </a>

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

export default connect(mapStateToProps, null)(ViewA);