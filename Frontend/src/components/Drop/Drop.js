import React, {Component} from 'react';
import DropResults from './DropResults';
import IO_BAR from '../SearchAddCourse/IO_BAR';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";




class Drop extends Component{

    constructor(props){
        super(props);
        console.log(props);

        this.state = {
            products: [],
            pname: '',
            selectedToDrop: 'Not Selected Yet',
            selectionDone: false,
            dbReadDone : false,
        }

        //bind
        this.setSelectedCourse = this.setSelectedCourse.bind(this);
        this.dropCourse = this.dropCourse.bind(this);
    }

    componentDidMount(){
        console.log('Component Did Mount of Drop');
        const data = {pname : this.state.pname};
        console.log("Dropping for student: "+data);
		axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/dropcourselist/',data)
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({
                        products: response.data,
                        dbReadDone : true,
                    })				
                }
            });
    }

    componentWillMount(){
        console.log('Component Will Mount of Products Main');
        this.setState({
            pname : this.props.logininfo.result.username
        })
    }



    setSelectedCourse = (e) => {
        console.log("Selected: "+e.currentTarget.dataset.id); 
        //e.currentTarget.style.backgroundColor = '#ccc';
        this.setState({
            selectedToDrop : e.currentTarget.dataset.id
        });
        

    }

    dropCourse = (e) => {
        e.preventDefault();
        const data = {
            cid : this.state.selectedToDrop,
            pname: this.props.logininfo.result.username
        }
        console.log("Course and User Selected: "+data.cid+", "+data.pname);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/dropcourse_waitlist/',data)
            .then(response =>{
                if(response.status === 200){
                    console.log("GOT Response in addcourse post: "+response.status);
                    this.setState({
                        selectionDone: true
                    });
					console.log("SelectionDone: "+this.state.selectionDone);
                } else {
                    console.log("Selected Course: "+this.state.selectedToDrop+" Could not be dropped in DB");
                }
            });
    }

    render(){

        let redirectVar = null;
        if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
			console.log("Cant load cookie at search page");
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.selectionDone){
            console.log("Deletion is done. Deleted course for user in DB and going back to home");
            redirectVar = <Redirect to= "/home"/>
        }
     
        return(
	
            <div>
            {redirectVar}

            <div className="center-align container mt-5">
                <div>
                    <h1>List of Courses Currently Enrolled In</h1>
                </div>
                <div>
                    <DropResults products={this.state.products} setSelectedCourse={this.setSelectedCourse}/>
                    <div>
                    <h1>Select and Press Drop to Unregister</h1>
                    </div>
                    <IO_BAR myinput={this.state.selectedToDrop} label='Input' />
                    <div className="form-group mt-3">
                    <button onClick={this.dropCourse} className="btn btn-primary btn-lg" >Drop</button>
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


export default connect(mapStateToProps, null)(Drop);