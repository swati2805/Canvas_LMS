import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class ViewPpl extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			gohome: false,
			students: 'NO_STUDENTS_YET',
			cid: '',
			pname: '',
			ptype: '',
			selectedToDrop: '',
			dropDone : false,
			viewStatus: false,
			gocode: false,
			}
		
	  }
	

		componentWillMount(){
			
			if(this.props.location.state != undefined){	
				console.log(this.props.location.state.id);	
				var myObj = JSON.parse(this.props.location.state.id);
				this.setState({
							cid : myObj.cid,
							pname : myObj.pname,
							ptype : myObj.ptype
							
							})
			} else {
				var myObj = {cid: "DefaultInput", pname : "Default", ptype : "Defualt"};
					this.setState({
						pname :this.props.logininfo.result.username
		    });
			}
	
		}	

	componentDidMount(){
			console.log('Component Did Mount of ViewPpl');
			const data = {cid: this.state.cid};
			console.log("ViewPpl DID: Data: "+data);
			axios.defaults.withCredentials = true;
			axios.post('http://localhost:3001/viewppl/',data)
					.then(response =>{
							if(response.status === 200){
									console.log(response.data);
									this.setState({
											students : response.data,
											viewStatus: true
									})
									console.log("GOT Response in viewppl post: "+this.state.students);				
							}
					});
	}
	
	handleClick = (param) => (e) => { 
		//console.log('Grades', e.target.value);
		console.log('selectedToDrop', param);
		this.setState({
			selectedToDrop : param,
		})
		const data = {"pname" : param, "cid" : this.state.cid};
		console.log("view Data: "+data);

		axios.defaults.withCredentials = true;
		axios.post('http://localhost:3001/dropcourse_waitlist/',data)
				.then(response =>{
					if(response.status === 200){
						console.log(response.data);
						this.setState({
							dropDone : true
						})				
				}
				});	

	}

render(){


	console.log("Students to view: "+this.state.students);

	let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
      console.log("Cant load cookie at Grade page");
      redirectVar = <Redirect to= "/login"/>
  }
  if((this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.gohome) || (this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.dropDone)) {
      console.log("Going back to home page");
      redirectVar = <Redirect to= "/home"/>
	}
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.gocode){
    console.log("gocode is set. Going to provide code page");
    var textObj3 = { cid: this.state.cid};
    var text3 = 	JSON.stringify(textObj3);	
    redirectVar = <Redirect to={{
      pathname: '/providecode',
      state: { id: text3}
    }} />
  }  
  
	let view_list = null;
  if(this.state.students !== 'NO_STUDENTS_YET') {

		if(this.state.ptype === 'faculty') {
    	view_list = this.state.students.map(a => {
      	return ( 
            	<div key={a.Student}>
                	  <li class="list-group-item list-group-item-warning">Student: {a.Student}
              	          <a>
			      	         			<button onClick = {this.handleClick(a.Student)} className="btn btn-danger pull-right">Remove from Course</button>
		      	          		</a>
        	          </li>
				
      	      </div>
    	  )
			});
		
		} else {
    	view_list = this.state.students.map(a => {
      	return ( 
            	<div key={a.Student}>
                	  <li class="list-group-item list-group-item-warning">Student: {a.Student}
        	          </li>
				
      	      </div>
				)
				});

		}
	}
	
	var permStr = null;
	if(this.state.ptype === 'faculty') {
	 permStr = <button  onClick={() => this.setState({gocode: true})} className="btn btn-success">Provide Enrollment Permission Code</button>
	}

	 return(
    <div>
    {redirectVar}


	<div class="container">
	<div class="panel panel-primary">
      <div class="panel-heading"><h3>Sudents Registered in Course: {this.state.cid}</h3></div>

      <ul class="list-group">
         {view_list}
      </ul>

      <a>
			
	  </a>
	</div>

	{permStr}

	<button  onClick={() => this.setState({gohome: true})} className="btn btn-info pull-right">Back to Home</button>
	

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

export default connect(mapStateToProps, null)(ViewPpl);

 
