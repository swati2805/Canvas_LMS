import React, {Component} from 'react';
import Search from './Search';
import CourseResults from './CourseResults';
import IO_BAR from './IO_BAR';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";


class SearchAddCourse extends Component{

    constructor(props){
        super(props);
        console.log(props);

        this.state = {
            products: [],
            selectedToAdd: 'Not Selected Yet',
            selectionDone: false,
            useCode : false,
        }

        //bind

        this.searchProduct = this.searchProduct.bind(this);
        this.setSelectedCourse = this.setSelectedCourse.bind(this);
        this.addCourse = this.addCourse.bind(this);
    }

    componentDidMount(){
        console.log('Component Did Mount of Products Main');
		axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/products/')
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({
                        products: response.data
                    })
					//console.log("GOT Response in products post: "+this.state.products[0].CourseId);
					//console.log("GOT Response in products post: "+this.state.products[0].CourseName);
					//console.log("GOT Response in products post: "+this.state.products[0].Faculty);
					//console.log("GOT Response in products post: "+this.state.products[0].CourseTerm);					
                }
            });
    }

    componentWillMount(){
        console.log('Component Will Mount of Products Main');
    }


    searchProduct = (e)=>{
        console.log('search');

        const data = 
        {
            "keyid": e.target.value
        }
		axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/search/',data)
            .then(response =>{
                if(response.status === 200){
                    console.log("GOT Response in search post: "+response.data);
                    this.setState({
                        products: response.data
                    });
					console.log(this.state.products);
					//console.log("GOT Response in search post: "+this.state.products[0].CourseId);
					//console.log("GOT Response in search post: "+this.state.products[0].CourseName);
					//console.log("GOT Response in search post: "+this.state.products[0].Faculty);
					//console.log("GOT Response in search post: "+this.state.products[0].CourseTerm);
                }
            });
    }

    setSelectedCourse = (e) => {
        console.log("Selected: "+e.currentTarget.dataset.id); 
        //e.currentTarget.style.backgroundColor = '#ccc';
        this.setState({
            selectedToAdd : e.currentTarget.dataset.id
        });
        

    }

    addCourse = (e) => {
        e.preventDefault();
        const data = {
            cid : this.state.selectedToAdd,
            pname: this.props.logininfo.result.username
        }

        if(data.cid !== 'Not Selected Yet' && data.cid !== 'COURSE_FULL') {
        console.log("Course and User Selected: "+data.cid+", "+data.pname);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/addcourse_waitlist/',data)
            .then(response =>{
                if(response.status === 200){
                    console.log("GOT Response in addcourse post: "+response.status);
                    this.setState({
                        selectionDone: true
                    });
					console.log("SelectionDone: "+this.state.selectionDone);
                } else {
                    console.log("Selected Course: "+this.state.selectedToAdd+" Could not be added in DB");
                }
            });

        }    
    }

    render(){

        let redirectVar = null;
        if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
			console.log("Cant load cookie at search page");
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.selectionDone){
            console.log("Selection is done added course to user in DB and going back to home");
            redirectVar = <Redirect to= "/home"/>
        }
        if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.useCode){
            console.log("useCode is set. Going to usecode page");
            var textObj = { pname : this.props.logininfo.result.username};
            var text = 	JSON.stringify(textObj);	
            redirectVar = <Redirect to={{
              pathname: '/usecode',
              state: { id: text}
            }} />
        }

        return(
	
            <div>
            {redirectVar}

            <div className="center-align container mt-5">
                <div>
                    <h1>Search And Add Courses</h1>
                </div>
                <div>
                    <Search searchProduct={this.searchProduct}/>
                    <div>
                    <h1>Filtered List of Searched Courses:</h1>
                    </div>
                    <div>
                    <h3>Click on a course to add to bucket</h3>
                    </div>
                    <CourseResults products={this.state.products} setSelectedCourse={this.setSelectedCourse}/>
                    <div>
                    <h1>Press Add to Enroll</h1>
                    </div>
                    <IO_BAR myinput={this.state.selectedToAdd} label='Input' />
                    <div className="form-group mt-3">
                    <button onClick={this.addCourse} className="btn btn-success btn-lg" >Add</button>
                    </div>
                </div>
                <div class="login-or">
                     <hr class="hr-or"/>
                </div>

                    <a>
			             <button  onClick={() => this.setState({useCode: true})} className="btn btn-info">Use Permission Code to Enroll</button>
	                </a>
                <div class="login-or">
                     <hr class="hr-or"/>
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


export default connect(mapStateToProps, null)(SearchAddCourse);