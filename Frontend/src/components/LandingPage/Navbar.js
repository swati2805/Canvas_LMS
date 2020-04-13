import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import axios from 'axios';
import { logoutUser } from "../../actions";

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    ////handleLogout = () => {
    //    cookie.remove('cookie', { path: '/' })
    //}


    handleLogout = () => {
        var data = {
            username : this.props.logininfo.result.username,
            password : this.props.logininfo.result.password
        }
        this.props.logoutUser(data);    
    }

    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag){
            console.log("Able to read cookie navbar");
			//console.log(cookie.load('cookie'));
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
				        <li><Link to="/profile"><span class="glyphicon glyphicon-user"></span>Profile</Link></li>
                        <li><Link to="/inbox"><span class="glyphicon glyphicon-envelope"></span>Messages</Link></li>
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-log-out"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie  navbar");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(this.props.logininfo.result &&   this.props.logininfo.result.authFlag){
            redirectVar = <Redirect to="/home"/>
        }
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">CANVAS</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><Link to="/home">Home</Link></li>
                    </ul>
                    {navLogin}
                </div>
            </nav>
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

export default connect(mapStateToProps, logoutUser)(Navbar);
