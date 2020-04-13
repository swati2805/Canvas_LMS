import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class QuizView extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			viewStatus: false,
			gohome: false,
			quizqs: 'NO_QUIZS_YET',
			QuizName: '',
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
							QuizName : myObj.QuizName
							
							})
			} else {
				var myObj = {cid: "DefaultInput", QuizName : "Default"};
			}
	
		}	

	componentDidMount(){
			console.log('Component Did Mount of QuizView');
			const data = {cid: this.state.cid, QuizName: this.state.QuizName};
			console.log("QuizView DID: Data: "+data);
			axios.defaults.withCredentials = true;
			axios.post('http://localhost:3001/quizview/',data)
					.then(response =>{
							if(response.status === 200){
									console.log(response.data);
									this.setState({
											quizqs: response.data,
									})
									console.log("GOT Response in quizview post: "+this.state.quizqs);				
							}
					});
	}
	
	

render(){


	console.log("QuizView: "+JSON.stringify(this.state.quizqs));
	let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag ){
      console.log("Cant load cookie at QUIZV page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag  && this.state.gohome){
      console.log("quizview is done. Going back to home page");
      redirectVar = <Redirect to= "/home"/>
	}
	
  
	let quizq_list = null;
  if(this.state.quizqs !== 'NO_QUIZS_YET') {
    quizq_list = this.state.quizqs.map(a => {

      return ( 
				<div>
				<div class="panel-heading"><h4>Question#{a.QuestionNumber}: {a.Question}</h4></div>
						<ul class="list-group">
									<li class="list-group-item list-group-item-warning">Correct Option: {a.RightA}</li>
									<li class="list-group-item list-group-item-warning">Other Option1: {a.A1}</li>
									<li class="list-group-item list-group-item-warning">Other Option2: {a.A2}</li>
									<li class="list-group-item list-group-item-warning">Other Option3: {a.A3}</li>
					  </ul>
				</div>
      )
    });
  }

	 return(
    <div>
    {redirectVar}


	<div class="container">
	<div class="panel panel-primary">
	<div class="panel-heading center-block text-center"><h1>Quiz: {this.state.QuizName}</h1></div>
     {quizq_list}
  </div>
	<a>
			<button  onClick={() => this.setState({gohome: true})} className="btn btn-danger pull-right">Back to Home</button>
	</a>
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

export default connect(mapStateToProps, null)(QuizView);