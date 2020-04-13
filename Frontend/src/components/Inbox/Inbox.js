import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Pagination from 'react-bootstrap/Pagination'
import { connect } from "react-redux";

class Inbox extends Component {

	constructor(props) {
		super(props);
		this.state = {
			gohome: false,
			dbReadStatus: false,
			messages: 'NO_MESSAGES_YET',
			pname: '',
			to_pname: '',
			content: '',
			currentPage: 1,
			todosPerPage: 3,
		}

	}

	handleSelect(number) {
		console.log('page clicked', number.target.id);
		this.setState({ currentPage: number.target.id });

	}

	setReceiver = (e) => {
		console.log("Setting Receiver " + e.target.id);
		this.setState({ to_pname: e.target.id });

	}


	setReceiver1 = (e) => {
		console.log("Setting Receiver1 " + e.target.value);
		this.setState({ to_pname: e.target.value });

	}


	handleInputChange = (e) => {
		console.log("Content :" + e.target.value);
		//console.log(e.target.name);
		this.setState({ content: e.target.value });

	}


	sendMessage = (e) => {
		console.log('Send Message of Inbox');
		const data = { from: this.state.pname, to: this.state.to_pname, content: this.state.content };
		console.log("Inbox Sending Message Data: " + JSON.stringify(data));
		axios.defaults.withCredentials = true;
		axios.post('http://localhost:3001/sendmessages/', data)
			.then(response => {
				if (response.status === 200) {
					console.log(response.data);
					console.log("GOT OK Response in send messages from server");
				}
			});
	}

	componentWillMount() {

		this.setState({ pname : this.props.logininfo.result.username})
	}

	componentDidMount() {
		console.log('Component Did Mount of Inbox');
		const data = { to: this.state.pname };
		console.log("Inbox Data: " + data);
		axios.defaults.withCredentials = true;
		axios.post('http://localhost:3001/getmessages/', data)
			.then(response => {
				if (response.status === 200) {
					console.log(response.data);
					this.setState({
						messages: response.data,
						dbReadStatus: true
					})
					
				}
			});
	}



	render() {


		console.log("Messages to view: " + this.state.messages);
		let redirectVar = null;
		if (this.props.logininfo.result &&  !this.props.logininfo.result.authFlag) {
			console.log("Cant load cookie at Inbox page");
			redirectVar = <Redirect to="/login" />
		}
		if (this.props.logininfo.result &&  this.props.logininfo.result.authFlag && this.state.gohome) {
			console.log("view is done. Going back to home page");
			redirectVar = <Redirect to="/home" />
		}

		let paginationBasic = null;
		let currentTodos = null;
		let message_list = null;
		if (this.state.messages !== 'NO_MESSAGES_YET') {
			message_list = this.state.messages.map((a, index) => {
				return (
					<div key={index}>
						<li class="list-group-item list-group-item-warning">From: {a.from} Message: {a.content}
							<a>
								<button type="button" className="btn btn-info btn-sm pull-right" data-toggle="modal" data-target={"#myModal"} id={a.from} data-id={a.from} onClick={this.setReceiver} >Reply</button>
							</a>
						</li>

					</div>
				)
			});


			// Logic for displaying current todos
			const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
			const indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
			currentTodos = message_list.slice(indexOfFirstTodo, indexOfLastTodo);


			// Logic for displaying page numbers
			const pageNumbers = [];
			for (let i = 1; i <= Math.ceil(message_list.length / this.state.todosPerPage); i++) {
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
						size="sm">{items}
					</Pagination>
					<br />
				</div>
			);

		}

		return (
			<div>
				{redirectVar}


				<div class="container">
					<div class="panel panel-primary">
						<div class="panel-heading"><h3>Inbox Messages:</h3></div>

						<ul class="list-group">
							{currentTodos}
						</ul>

						<div class="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {paginationBasic}
                    </div>

						<div class="login-or">
							<hr class="hr-or" />
						</div>

						<a>
							<button onClick={() => this.setState({ gohome: true })} className="btn btn-danger">Back to Home</button>
						</a>

						<a>
							<button type="button" className="btn btn-warning btn-sm pull-right" data-toggle="modal" data-target={"#myModal1"} >New Message</button>
						</a>
					</div>

					<div className="modal fade" id={"myModal"} role="dialog">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h4 className="modal-title">Reply</h4>
									<button type="button" className="close" data-dismiss="modal">&times;</button>
								</div>
								<div className="modal-body">
									<p></p>
									<div className="form-group">
										<textarea type="text" name="messageContent" id="messageContent" className="form-control form-control-lg" placeholder="Type your message here" onChange={this.handleInputChange} />
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" name={"RAGS"} className="btn btn-success" data-dismiss="modal" onClick={this.sendMessage}>Send</button>
								</div>
							</div>

						</div>
					</div>

					<div className="modal fade" id={"myModal1"} role="dialog">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h4 className="modal-title">New Message</h4>
									<button type="button" className="close" data-dismiss="modal">&times;</button>
								</div>
								<div className="modal-body">
									<p></p>
									<div class="form-group">
										<label for="recipient-name" class="col-form-label">Recipient:</label>
										<input type="text" class="form-control" id="recipient-name" onChange={this.setReceiver1} />
									</div>
									<div className="form-group">
										<textarea type="text" name="messageContent" id="messageContent" className="form-control form-control-lg" placeholder="Type your message here" onChange={this.handleInputChange} />
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" name={"RAGS"} className="btn btn-success" data-dismiss="modal" onClick={this.sendMessage}>Send</button>
								</div>
							</div>

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


export default connect(mapStateToProps, null)(Inbox);