import React, {Component} from 'react';
import '../../App.css';
import './Home.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Course from '../Course/Course';
import {BrowserRouter} from 'react-router-dom';
import { connect } from "react-redux";

//Component for Student
class HomeS extends Component {
    constructor(){
        super();
        this.state = {  
			cources_s : [],
			cources_f : [],
			pname: '',
			ptype: '',
			course_selected: '',
			cid_selected: '',
			selection_done: false,
			dbReadDone_s : false,
			dbReadDone_f : false,
			
        }
		
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


    onDragOver = (e) => {

    	e.preventDefault();
    }

    onDragStart = (ev, id) => {
     console.log("dragstart :"+id);
     ev.dataTransfer.setData("id", id);

    }


    onDrop = (ev, cat) => {       
  		let id = ev.dataTransfer.getData("id");




     if(this.state.ptype  === 'student') {
  		let tasks = this.state.cources_s.filter((c) => {
      			if (c.CourseId == id) {
               		c.category = cat;           
      			}              
       			return c;       
   			});        
   		this.setState({           
      		cources_s : tasks       
   		});    

   	} else if(this.state.ptype  === 'faculty') {

  		let tasks = this.state.cources_f.filter((c) => {
      			if (c.CourseId == id) {
               		c.category = cat;           
      			}              
       			return c;       
   			});        
   		this.setState({           
      		cources_f : tasks       
   		});    

   	}


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
						pname : this.props.logininfo.result.username
		    })
		}		
		
		//const data = {pname : cookie.load('cookie')};
		//console.log("Will DATA IS HERE: "+data.pname);
		//console.log("Will Cookie is: "+cookie.load('cookie'));
		console.log("Will STATE PNAME IS HERE: "+this.state.pname);

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


                    if (response.data === 'NO_COURSE_YET') {

                    	    this.setState({
										dbReadDone_s : true,
										cources_s   : response.data
                    		})

                    } else {
                    var temp_s = response.data.map( (c,index) => {
                    	var element = {CourseId : c.CourseId, CourseName : c.CourseName, category : (index%2) ? "complete" : "wip" };
                    	return element;
                    });

                    this.setState({
						dbReadDone_s : true,
						cources_s   : temp_s
                    })

                }

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
                    
                    if (response.data === 'NO_COURSE_YET') {

                    	    this.setState({
										dbReadDone_f : true,
										cources_f   : response.data
                    		})

                    } else {
                    var temp_f = response.data.map( (c,index) => {
                    	var element = {CourseId : c.CourseId, CourseName : c.CourseName, category : (index%2) ? "complete" : "wip" };
                    	return element;
                    });

                    this.setState({
						dbReadDone_f : true,
						cources_f   : temp_f
                    })

                }


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
		
		
		var cources = null;

		if(this.state.ptype === 'student') {
			 cources = this.state.cources_s;
		} else if (this.state.ptype === 'faculty') {
			 cources = this.state.cources_f;
		} else {
			cources = 'NO_COURSE_YET'
		}
		console.log("Render home with Courses Finally: "+cources);	

        //let details = null;
        var details = {
        	wip : [],
        	complete : []
        }

		if(cources === 'NO_COURSE_YET') {
            console.log("inside NO_COURSE_YET")
				  details.wip.push(
					<div                  
      					draggable                    
      					className="draggable"                    
      					style={{backgroundColor: "pink"}}> 
      					<div class="card text-center ">
							<img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"  width="300" height="210" alt="Card image cap"/>
							<div class="card-body">
					  			<h4 class="card-title" style={{fontWeight: "bold"}}>No Courses to show yet</h4>
							</div>
			  			</div>                      
         				            
    				</div>
    				); 
		} else {


			cources.map( (c) => {
				if(c.category === "wip") {
				  details.wip.push(
					<div 
      					key={c.CourseId}                     
      					onDragStart={(e)=>this.onDragStart(e, c.CourseId)}                    
      					draggable                    
      					className="draggable"                    
      					style={{backgroundColor: "pink"}}> 
      					<div class="card text-center ">
							<img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"  width="300" height="210" alt="Card image cap"/>
							<div class="card-body">
					  			<h4 class="card-title" style={{fontWeight: "bold"}}>{c.CourseId}: {c.CourseName}</h4>
					  			<a href="#" class="btn btn-primary btn-sm"  onClick={this.setSelectedCourse} id={c.CourseId} data-id={c.CourseId}>View</a>
							</div>
			  			</div>                      
         				            
    				</div>
    				);  

				} else {

				  details.complete.push(
					<div 
      					key={c.CourseId}                     
      					onDragStart={(e)=>this.onDragStart(e, c.CourseId)}                    
      					draggable                    
      					className="draggable"                    
      					style={{backgroundColor: "yellow"}}>                       
         				<div class="card text-center ">
							<img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"  width="300" height="210" alt="Card image cap"/>
							<div class="card-body">
					  			<h4 class="card-title" style={{fontWeight: "bold"}}>{c.CourseId}: {c.CourseName}</h4>
					  			<a href="#" class="btn btn-primary btn-sm"  onClick={this.setSelectedCourse} id={c.CourseId} data-id={c.CourseId}>View</a>
							</div>
			  			</div>              
    				</div>
    				);  


				}

			});

		} 
		console.log("Details are: "+details);
		
		let options = null;
		if(cources !== 'NO_COURSE_YET') {
		 options = cources.map(c => {
			        return(<option student>{c.CourseName}</option>)
			})

		}	
			
		let cando = null;	
		if(this.state.ptype === 'student') {
                cando =  (<ul class="nav nav-pills">
                                <li class="list-group-item list-group-item-info"><Link to="/search">Search/Add a Course</Link></li>
                                <li class="list-group-item list-group-item-info"><Link to="/drop">Drop a Course</Link></li>
                            </ul>);
		} else {
                cando =  (<ul class="nav nav-pills">
                           <li class="list-group-item list-group-item-info"><Link to="/newcourse">Start a new Course</Link></li> 
                         </ul>);
		} 			
                 
			
		
        let redirectVar = null;
        if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
			console.log("Cant load cookie home");
            redirectVar = <Redirect to= "/login"/>
        }
		
		if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.selection_done && cources !== 'NO_COURSE_YET'){
			console.log("selection done home");
			console.log("Curse selected: "+this.state.course_selected);
            console.log("Course list: "+JSON.stringify(cources));

			var index = cources.map(function(c){
				return c.CourseId;
			}).indexOf(this.state.course_selected); 
			
			if(index === -1) {
				console.log("incorrect course selection");
			} 
			
			console.log(cources[index].CourseName);
			console.log(cources[index].CourseId);
			
			var textObj = { label: cources[index].CourseName, myinput: cources[index].CourseId, pname : this.state.pname, ptype : this.state.ptype };
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
	
	return(
	
	<div>
	{redirectVar}

    <div class="panel panel-danger">
        <div class="panel-heading">
           <h1>{welcome}</h1>
        </div>
    </div>

	<div class="login-or">
        <hr class="hr-or"/>
    </div>

	<div class="container-fluid">
		{cando}
    </div>
	
	
	<div>
	
	<div class="login-or">
        <hr class="hr-or"/>
    </div>
	



    <div className="container-drag">
     <h2 className="header"></h2>                  
     <div className="wip" 
       onDragOver={(e)=>this.onDragOver(e)}                    
       onDrop={(e)=>{this.onDrop(e, "wip")}}>                    
      <span className="task-header"></span>                    
      {details.wip}                
     </div>                
     <div className="droppable"
      onDragOver={(e)=>this.onDragOver(e)}                    
      onDrop={(e)=>this.onDrop(e, "complete")}>                     
      <span className="task-header"></span>                     
      {details.complete}                
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

export default connect(mapStateToProps, null)(HomeS);