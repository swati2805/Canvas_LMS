import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class AddQuiz extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			gohome: false,
			questionAddedDB : false,
			qcount : 1,
			question: '',
			a1 : '',
			a2 : '',
			a3 : '',
			right_a : '',
			cid: '',
			pname: '',
			quizname: '',
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


	addQuizQuestion = (e) => {
		//prevent page from refresh
		e.preventDefault();
		const data = {
				cid : this.state.cid,
				quizname : this.state.quizname,
				question : this.state.question,
				qcount : this.state.qcount,
				right_a : this.state.right_a,
				a1  : this.state.a1,
				a2  : this.state.a2,
				a3  : this.state.a3
		}
		//set the with credentials to true
		axios.defaults.withCredentials = true;
		//make a post request with the user data
		axios.post('http://localhost:3001/addquiz',data)
				.then(response => {
						console.log("Status Code : ",response.status);
						if(response.status === 200){
								this.setState({
									questionAddedDB : true,
									question: '',
									right_a: '',
									a1 : '',
									a2 : '',
									a3 : '',
									qcount : this.state.qcount+1
								})
						}else{
								this.setState({
									questionAddedDB : false
								})
						}
				});
}


submitQuiz = (e) => {
	//prevent page from refresh
	e.preventDefault();
	const data = {
			cid : this.state.cid,
			quizname : this.state.quizname,
			question : this.state.question,
			qcount : this.state.qcount,
			right_a : this.state.right_a,
			a1  : this.state.a1,
			a2  : this.state.a2,
			a3  : this.state.a3
	}

	if(this.state.question !== ''){
	//set the with credentials to true
	axios.defaults.withCredentials = true;
	//make a post request with the user data
	axios.post('http://localhost:3001/addquiz',data)
			.then(response => {
					console.log("Status Code : ",response.status);
					if(response.status === 200){
							this.setState({
								questionAddedDB : true,
								question: '',
								right_a: '',
								a1 : '',
								a2 : '',
								a3 : '',
								qcount : this.state.qcount+1,
								gohome : true
							})
					}else{
							this.setState({
								questionAddedDB : false
							})
					}
			});

	} else {

		this.setState({
			gohome : true
		})

	}	
}


render(){


	console.log("Grade Assignments to view: "+this.state.submissions);
	console.log("Grade Map at Render: "+JSON.stringify(this.state.gradesMap));

	let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
      console.log("Cant load cookie at Grade page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.gohome){
      console.log("Grading is done. Going back to home page");
      redirectVar = <Redirect to= "/home"/>
	}


	 return(
    <div>
    {redirectVar}

		<div class="panel panel-primary">
      <div class="panel-heading"><h3>Quiz</h3>
			<div class="form-group" >
				<label for="inputEmail4">Enter Quiz Name</label>
				<input onChange = {(e) => this.setState({quizname:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Quiz Name" value={this.state.quizname}/>
			</div>
			</div>

	<div class="container">
      <div class="container">
	  
	  <form action="http://127.0.0.1:3000/addquizQuestion" method="post">
		<div class="form-row">
			<div class="form-group" >
				<label for="inputEmail4">Question#{this.state.qcount}</label>
				<input onChange = {(e) => this.setState({question:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Question" value={this.state.question}/>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group  col-md-6" >
				<label for="inputEmail4">Correct Answer</label>
				<input onChange = {(e) => this.setState({right_a:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Correct Answer" value={this.state.right_a}/>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputEmail4">Option1</label>
				<input onChange = {(e) => this.setState({a1:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Option1" value={this.state.a1}/>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group  col-md-6" >
				<label for="inputEmail4">Option2</label>
				<input onChange = {(e) => this.setState({a2:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Option2" value={this.state.a2}/>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group  col-md-6">
				<label for="inputEmail4">Option3</label>
				<input onChange = {(e) => this.setState({a3:e.target.value})} type="firstname" class="form-control" id="inputEmail4" placeholder="Option3" value={this.state.a3}/>
			</div>
		</div>
		<div class="form-row">
         <div class="bottom-right">
					<button  onClick = {this.addQuizQuestion} type="submit" class="btn btn-success">+Add Another Question</button>
	     </div>
		</div>	
		<div class="form-row">
         <div class="bottom-right">
					<button  onClick = {this.submitQuiz} type="submit" class="btn btn-primary pull-right">Publish Quiz</button>
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

export default connect(mapStateToProps, null)(AddQuiz);

