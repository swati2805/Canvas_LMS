import React, {PropTypes} from 'react';

class Profilearea extends React.Component{
	constructor(props){
    super(props);
    }
	render() {

    var picFilePath = `http://localhost:3001/uploads/profilepics/${this.props.pic}`
    console.log(picFilePath)

  return (
  	<div class="container">
    <div class="panel panel-primary">
      <div class="panel-heading"><h1>Profile for {this.props.first_name}</h1></div>
      <div align="center"><img alt="User Pic" src={picFilePath} class="img-circle img-responsive"/> </div>
      <ul class="list-group">
        <li class="list-group-item list-group-item-warning">first_name: {this.props.first_name}</li>
        <li class="list-group-item list-group-item-warning">last_name: {this.props.last_name}</li>
        <li class="list-group-item list-group-item-warning">email: {this.props.email}</li>
        <li class="list-group-item list-group-item-warning">city: {this.props.city}</li>
        <li class="list-group-item list-group-item-warning">gender: {this.props.gender}</li>
        <li class="list-group-item list-group-item-warning">phone_number: {this.props.phone_number}</li>
        <li class="list-group-item list-group-item-warning">school: {this.props.school}</li>
        <li class="list-group-item list-group-item-warning">hometown: {this.props.hometown}</li>
        <li class="list-group-item list-group-item-warning">company: {this.props.company}</li>
        <li class="list-group-item list-group-item-warning">languages:{this.props.languages}</li>
        <li class="list-group-item list-group-item-warning">country: {this.props.country}</li>
        <li class="list-group-item list-group-item-warning">about_me: {this.props.about_me}</li>

      </ul>

    </div>

    </div>
  )
}
}

export default Profilearea;