import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class TakeQuiz extends Component {

	constructor(props) {
		super(props);
		  this.state = {
			viewStatus: false,
			gohome: false,
			quizqs: 'NO_QUIZS_YET',
			QuizName: '',
			cid: '',
			pname: '',
			answers : Array(31).fill(null),
			finalmax : 0,
			finalscore : 0,
			evalDone : false,
			viewAns : false,
		  }
	  }
	

	componentWillMount(){
			
			if(this.props.location.state != undefined){	
				console.log(this.props.location.state.id);	
				var myObj = JSON.parse(this.props.location.state.id);
				this.setState({
							cid : myObj.cid,
							QuizName : myObj.QuizName,
							pname : myObj.pname
							
							})
			} else {
				var myObj = {cid: "DefaultInput", QuizName : "Default", pname : "Default"};
				this.setState({
						pname :this.props.logininfo.result.username
		    });
			}
	
	}	

	componentDidMount(){
			console.log('Component Did Mount of takequiz');
			const data = {cid: this.state.cid, QuizName: this.state.QuizName};
			console.log("takequiz DID: Data: "+data);
			axios.defaults.withCredentials = true;
			axios.post('http://localhost:3001/quizview/',data)
					.then(response =>{
							if(response.status === 200){
									console.log(response.data);
									this.setState({
											quizqs: response.data,
											finalmax : response.data.length
									})
									console.log("GOT Response in takequiz post: "+this.state.quizqs);				
							}
					});
	}
	
	handleChange = (param) => (e) => { 
		e.preventDefault();
		var valuex = e.target.value;
		console.log('Selected Option', e.target.value);
		console.log('Question#', param);
		const tempAns = this.state.answers.slice();
		tempAns[param] = valuex;
		this.setState({answers: tempAns});
	}

	shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
 	}

	evalQuiz  = (e) => {
		e.preventDefault();
		var maxScore = this.state.quizqs.length;
		var myScore = 0;

		for(let i = 0; i < maxScore; i++) {
			console.log("RightA for Q#"+i+" :"+this.state.quizqs[i].RightA);
			console.log("ANS for Q#"+i+" :"+this.state.answers[i+1]);
			
			if(this.state.quizqs[i].RightA === this.state.answers[i+1]) {
				myScore += 1;
			}
		}

		console.log("MAX SCORE: "+maxScore);
		console.log("MY SCORE: "+myScore);

		this.setState({
			finalscore : myScore,
			evalDone : true
	})

	}

  submitScore  = (e) => {
		e.preventDefault();
		const data = {cid: this.state.cid, QuizName: this.state.QuizName, pname: this.state.pname, maxS : this.state.finalmax, myScore : this.state.finalscore, taken : 'DONE'};
		console.log("submit Quiz Data: "+data);
		axios.defaults.withCredentials = true;
		axios.post('http://localhost:3001/submitquiz/',data)
				.then(response =>{
						if(response.status === 200){
								console.log(response.data);
								this.setState({
                     gohome : true
								})
								console.log("GOT Response submitquiz");				
						}
				});


	}

render(){


	console.log("TakeQuiz Q: "+JSON.stringify(this.state.quizqs));
	console.log("TakeQuiz A: "+JSON.stringify(this.state.answers));
	let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
      console.log("Cant load cookie at QUIZV page");
      redirectVar = <Redirect to= "/login"/>
  }
  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.gohome){
      console.log("takequiz is done. Going back to home page");
      redirectVar = <Redirect to= "/home"/>
	}
	if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.viewAns){
    console.log("Going to view quiz page with quizToSee: "+this.state.QuizName);
    var textObj6 = { cid: this.state.cid, QuizName : this.state.QuizName};
    var text6 = 	JSON.stringify(textObj6);	
    redirectVar = <Redirect to={{
      pathname: '/quizview',
      state: { id: text6}
    }} />
  }
	
	var nextSteps = null;
	var scoreSheet = null;
	var viewAns = null;
	if(this.state.evalDone) {
		scoreSheet = <li class="list-group-item list-group-item-info">You Scored: {this.state.finalscore}/{this.state.finalmax}</li>
		nextSteps = <button  onClick = {this.submitScore} type="submit" class="btn btn-success">Submit Score and Go Home</button>
		viewAns = <button  onClick = {(e) => this.setState({viewAns:true})} type="submit" class="btn btn-danger pull-right">View Quiz Solution</button>
	}

  
	let quizq_list = null;
	let eval_button = null;
  if(this.state.quizqs !== 'NO_QUIZS_YET' && !this.state.evalDone) {
		eval_button = <button  onClick={this.evalQuiz} className="btn btn-success">Evaluate</button>
    quizq_list = this.state.quizqs.map(a => {

			var oparr = [a.RightA, a.A1, a.A2, a.A3];
			var shuffledops = this.shuffle(oparr);

      return ( 
				<div>
				<div class="panel-heading"><h4>Question#{a.QuestionNumber}: {a.Question}</h4></div>
						<ul class="list-group">
						<li className="list-group-item list-group-item-warning">1.
						<input onChange={this.handleChange(a.QuestionNumber)} type="radio" value={shuffledops[0]} checked={this.state.answers[a.QuestionNumber] === shuffledops[0]}/> {shuffledops[0]}
						</li>
						<li className="list-group-item list-group-item-warning">2.
						<input onChange={this.handleChange(a.QuestionNumber)} type="radio" value={shuffledops[1]} checked={this.state.answers[a.QuestionNumber] === shuffledops[1]}/> {shuffledops[1]}
						</li>
						<li className="list-group-item list-group-item-warning">3.
						<input onChange={this.handleChange(a.QuestionNumber)} type="radio" value={shuffledops[2]} checked={this.state.answers[a.QuestionNumber] === shuffledops[2]}/> {shuffledops[2]}
						</li>
						<li className="list-group-item list-group-item-warning">4.
						<input onChange={this.handleChange(a.QuestionNumber)} type="radio" value={shuffledops[3]} checked={this.state.answers[a.QuestionNumber] === shuffledops[3]}/> {shuffledops[3]}
						</li>
					  </ul>
				</div>
      )
    });
	}
	
	if(this.state.evalDone) {
		quizq_list = null;
		eval_button = null;
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
		 {eval_button}	
	</a>

	<ul class="list-group">
	 {scoreSheet}
	</ul>
  <a>
		{nextSteps}
	</a>
	<a>
		{viewAns}
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

export default connect(mapStateToProps, null)(TakeQuiz);