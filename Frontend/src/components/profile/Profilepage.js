import React, {PropTypes} from 'react';
import Profilearea from './Profilearea'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { getProfile } from "../../actions";
import { connect } from "react-redux";
import axios from 'axios';

class Profilepage extends React.Component {
	constructor(props){
    super(props);
    this.state={
    updateProfile : false,
    pic : ''
    }
  }

componentDidMount(){
    console.log('Component Did Mount of profilepage');
    const data = {"pname" : this.props.logininfo.result.username};
    this.props.getProfile(data);

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/getpic/',data)
        .then(response =>{
            if(response.status === 200){
                console.log(response.data);
                console.log("FIRST_NAME: "+response.data[0].first_name);
                console.log("PIC: "+response.data[0].ProfilePic);
                this.setState({
                    pic: response.data[0].ProfilePic
                })      
            }
        });
}

render() {
  let redirectVar = null;
  if(this.props.logininfo.result &&  !this.props.logininfo.result.authFlag){
      console.log("Cant load cookie at search page");
      redirectVar = <Redirect to= "/login"/>
  }

  if(this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.updateProfile && this.props.profileinfo.authFlag) {
    console.log("updateProfile is set. Going to updateProfile page");

    var textObj2 = {  first_name: this.props.profileinfo.first_name, 
                      last_name : this.props.profileinfo.last_name,
                      email:  this.props.profileinfo.email,
                      city:  this.props.profileinfo.city,
                      gender:  this.props.profileinfo.gender,
                      phone_number:  this.props.profileinfo.phone_number,
                      school:  this.props.profileinfo.school,
                      hometown:  this.props.profileinfo.hometown,
                      company:  this.props.profileinfo.company,
                      languages:  this.props.profileinfo.languages,
                      country:  this.props.profileinfo.country,
                      about_me:  this.props.profileinfo.about_me
                  };
    var text2 = 	JSON.stringify(textObj2);	
    redirectVar = <Redirect to={{
      pathname: '/updateprofile',
      state: { id: text2}
    }} />
  }

  console.log("Profile Render0 :"+this.props.profileinfo);
  console.log("Profile Render1 :"+this.props.profileinfo.authFlag);
  console.log("Profile Render2 :"+this.props.profileinfo.first_name);
  console.log("Profile Render3 :"+this.props.profileinfo.last_name);


  var strDisplay = null;
  if(this.props.profileinfo.authFlag) {
  strDisplay =   <Profilearea first_name={this.props.profileinfo.first_name} last_name={this.props.profileinfo.last_name} email={this.props.profileinfo.email} city={this.props.profileinfo.city} gender={this.props.profileinfo.gender} phone_number={this.props.profileinfo.phone_number} school={this.props.profileinfo.school} hometown={this.props.profileinfo.hometown} company={this.props.profileinfo.company} languages={this.props.profileinfo.languages} country={this.props.profileinfo.country} about_me={this.props.profileinfo.about_me}  pic={this.state.pic}/>
  }

    return (
      <div>
      {redirectVar}
  
  
      <div>
        {strDisplay}
        <a>
            <button  onClick={() => this.setState({updateProfile : true})} className="btn btn-primary btn-lg pull-right">Update Profile</button>
        </a>

        </div>
        </div>
    );
}



}


  //This method is provided by redux and it gives access to centeral store
  function mapStateToProps(state) {
    return { profileinfo : state.profileinfo,
             logininfo : state.logininfo};
  }
  
  
  export default connect(mapStateToProps, { getProfile })(Profilepage);


