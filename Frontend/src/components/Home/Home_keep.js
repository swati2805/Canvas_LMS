import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Course from '../Course/Course';
import {BrowserRouter} from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import { connect } from "react-redux";

//Component for Student
class HomeS extends Component {
    constructor(){
        super();
        this.state = {  
			cources_s : 'NO_COURSE_YET',
			cources_f : 'NO_COURSE_YET',
			pname: '',
			ptype: '',
			course_selected: '',
			cid_selected: '',
			selection_done: false,
			dbReadDone_s : false,
			dbReadDone_f : false,
			currentPage: 1,
			todosPerPage: 3,
			
        }
		
    }  

	handleSelect(number) {
		console.log('page clicked', number.target.id);
		this.setState({currentPage : number.target.id});
	
	}

	
    setSelectedCourse = (e) => {
		console.log("Selected to view: "+e.currentTarget.dataset.id); 
		console.log("Selected to view: "+e.target.id); 
		
        //e.currentTarget.style.backgroundColor = '#ccc';
        this.setState({
			course_selected: e.currentTarget.dataset.id,
			selection_done:true
       });
        //selection_done:true

    }
	 
    componentWillMount(){		
			
		if(this.props.location.state != undefined){	
			console.log("PNAME: "+this.props.location.state.id);	
			var myObj = JSON.parse(this.props.location.state.id);
			this.setState({
						pname : myObj.pname
            })
		} else {
			var myObj = {pname: "Default"};
			this.setState({
						pname :this.props.logininfo.result.username
		    })
		}		
		
	}
    
	//Get info on cources and ptype for database and use that to change state to render correct info
    componentDidMount(){	
        const data = {pname : this.state.pname, ptype: this.state.ptype};
		console.log("DID DATA IS HERE: "+data.pname);
		console.log("DID PTYPE IS HERE: "+data.ptype);
		//console.log("DID Cookie is: "+cookie.load('cookie'));
		console.log("DID STATE IS HERE: "+this.state.pname);
		
		axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/home',data)
            .then(response => {
                console.log("Status Code : ",response.status);
				console.log("Status Data : ",response.data);
                if(response.status === 200){
                    this.setState({
						dbReadDone_s : true,
						cources_s   : response.data
                    })
                }else{
                    this.setState({
                        dbReadDone_s : false
                    })
                }
			});
			
		console.log("DID Mount home with Courses: "+this.state.cources);	
		axios.post('http://localhost:3001/homegetinfo',data)
		.then(response => {
			console.log("Will Status: ",response.status);
			console.log("Will Status Ptype is : ",response.data);
			if(response.status === 200){
				this.setState({
					ptype   : response.data[0].ptype
				})
			}
		});

        axios.post('http://localhost:3001/homegetfacluty',data)
            .then(response => {
                console.log("Faculty Status Code : ",response.status);
				console.log("Faculty Status Data : ",response.data);
                if(response.status === 200){
                    this.setState({
						dbReadDone_f : true,
						cources_f   : response.data
                    })
                }else{
                    this.setState({
                        dbReadDone_f : false
                    })
                }
		});
	
    }

     render(){
		//console.log("Render Cookie is: "+cookie.load('cookie'));
		console.log("Render STATE IS HERE: "+this.state.pname);
		console.log("Render home with Courses S : "+this.state.cources_s);	
		console.log("Render home with Courses F : "+this.state.cources_f);	
		console.log("Render STATE PTYPE IS HERE: "+this.state.ptype);
		console.log("current page is: "+this.state.currentPage);

		if(this.props.logininfo.result){
		console.log("Home Render2 :"+this.props.logininfo.result.authFlag);
		console.log("Home Render3 :"+this.props.logininfo.result.username);
		}

		
		var cources = null;

		if(this.state.ptype === 'student') {
			 cources = this.state.cources_s;
			 console.log("Setting to cources: "+cources+" for ptype "+this.state.ptype)
		} else if (this.state.ptype === 'faculty') {
			 cources = this.state.cources_f;
			 console.log("Setting to cources: "+cources+" for ptype "+this.state.ptype)
		} else {
			cources = 'NO_COURSE_YET'
			console.log("Setting to NO_COURSE_YET")
		}
		console.log("Render home with Courses Finally: "+cources);	

		let details = null;
		let cards = null;
		let paginationBasic = null;
		let currentTodos = null;
		 if (cources === 'NO_COURSE_YET') {
			 console.log("inside NO_COURSE_YET")
			 details = (

				 <li class="list-group-item list-group-item-warning">No Courses Added or Created Yet</li>
			 );

			 cards = (
				<div class="card text-center ">
				<img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap"/>
				<div class="card-body">
				  <h1 class="card-title">No Courses Added or Created Yet</h1>
				</div>
			  </div>
			 );


		 } else {
		 	console.log("Render home with Courses Finally1: "+cources);
			 details = cources.map(c => {
				 return (

					 <li class="list-group-item list-group-item-warning">{c.CourseId}: {c.CourseName} Faculty: {c.Faculty}  Term: {c.CourseTerm}</li>

				 )
			 })

			 cards = cources.map((c,index) => {

				var classn = (index%2) ? "card text-center " : "card text-center p-3";

				return (

					<div class={classn}>
					<img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap"/>
					<div class="card-body">
					  <h1 class="card-title">{c.CourseId}: {c.CourseName}</h1>
					  <a href="#" class="btn btn-primary btn-lg"  onClick={this.setSelectedCourse} id={c.CourseId} data-id={c.CourseId}>View</a>
					</div>
				  </div>

				)
			})

			 // Logic for displaying current todos
			 const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
			 const indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
			 currentTodos = details.slice(indexOfFirstTodo, indexOfLastTodo);

			 // Logic for displaying page numbers
			 const pageNumbers = [];
			 for (let i = 1; i <= Math.ceil(details.length / this.state.todosPerPage); i++) {
				 pageNumbers.push(i);
			 }

			 let items = [];
			 for (let number = 1; number <= pageNumbers.length; number++) {
				 items.push(
					 <Pagination.Item key={number} id={number} value={number} active={number == this.state.currentPage} onClick={this.handleSelect.bind(this)}>
						 {number}
					 </Pagination.Item>,
				 );
			 }

			 paginationBasic = (
				 <div>
					 <Pagination
						 size="lg">{items}
					 </Pagination>
					 <br />
				 </div>
			 );




		 } 
		console.log(details);
		
		let options = null;
		if(cources !== 'NO_COURSE_YET') {
		 options = cources.map(c => {
			        return(<option student>{c.CourseName}</option>)
			})

		}	
			
		let cando = null;	
		if(this.state.ptype === 'student') {
                cando =  (<ul class="nav nav-pills">
                                <li class="list-group-item list-group-item-info py-4 " style={{fontSize:20}}><Link to="/search">Search/Add a Course</Link></li>
                                <li class="list-group-item list-group-item-info py-4" style={{fontSize:20}}><Link to="/drop">Drop a Course</Link></li>
                            </ul>);
		} else {
                cando =  (<ul class="nav nav-pills">
                           <li class="list-group-item list-group-item-info py-4" style={{fontSize:20}}><Link to="/newcourse">Start a new Course</Link></li> 
                         </ul>);
		} 			
                 
			
		
        let redirectVar = null;
        if(this.props.logininfo.result && !this.props.logininfo.result.authFlag){
			console.log("Cant load cookie home");
            redirectVar = <Redirect to= "/login"/>
        }
		
		if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.selection_done && cources !== 'NO_COURSE_YET'){
			console.log("selection done home");
			console.log("Curse selected: "+this.state.course_selected);
			var index = cources.map(function(c){
				return c.CourseId;
			}).indexOf(this.state.course_selected); 
			
			if(index === -1) {
				console.log("incorrect course selection");
			} 
			
			console.log(cources[index].CourseName);
			console.log(cources[index].CourseId);
			
			var textObj = { label: cources[index].CourseName, myinput: cources[index].CourseId, pname : this.props.logininfo.result.username, ptype : this.state.ptype };
			var text = 	JSON.stringify(textObj);		    
	 
			if(this.state.ptype === 'student') {
		    	redirectVar = <Redirect to={{
									pathname: '/courseS',
									state: { id: text}
							  }} />
			} else {
		    	redirectVar = <Redirect to={{
									pathname: '/course',
									state: { id: text}
			  					}} />
			}
                 
        }
		console.log("selected: "+this.state.course_selected);
		
		var welcome = "Welcome " + this.state.pname+" UserType: "+this.state.ptype;
	
		return (


			<div>
				{redirectVar}

				<div>
					<head>

						<meta charset="utf-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=on" />


						<link rel="stylesheet" href="https://unpkg.com/@coreui/coreui/dist/css/coreui.min.css" />

					</head>
					<body class="app">


						<div class="card-columns">
							{cards}
						</div>


						<div class="container-fluid">
							{cando}
						</div>


						<script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
						<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
						<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
						<script src="https://unpkg.com/@coreui/coreui/dist/js/coreui.min.js"></script>
					</body>

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

export default connect(mapStateToProps, null)(HomeS);

