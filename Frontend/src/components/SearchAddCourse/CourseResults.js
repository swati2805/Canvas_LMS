import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination'

class CourseResults extends Component {

    constructor(){
        super();
        this.state = {  
			currentPage: 1,
			todosPerPage: 3,
        }
		
    }  

    handleSelect(number) {
		console.log('page clicked', number.target.id);
		this.setState({currentPage : number.target.id});
	
	}


    componentWillMount() {
        console.log('Component Will mount of product results invoked!');
    }

    componentDidMount() {
        console.log('Component Did mount of product results invoked!');
        
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('Should Component update', nextProps, "state", nextState);
       return true;
        
    }

    componentWillReceiveProps(nextProps){
        console.log('Component Will Recieve Props ', nextProps);
        //Assign props to state

    }

    
    componentWillUpdate(nextProps, nextState){
        console.log(' Component will update', nextProps, ".State: ", nextState);
        
    }

    componentDidUpdate(){

        console.log('component did update');
        
    }


    render() {

        var productResult1 = null;
        let paginationBasic = null;
        let currentTodos = null;

        if (this.props.products != null) {
            productResult1 = this.props.products.map(product => {
                var waitlist = null;
                var warning = '';
                var courseToAdd = product.CourseId;
                if ((parseInt(product.CurrentWaitlistSize, 10) + 1) <= parseInt(product.WaitlistCapacity, 10)) {
                    if (parseInt(product.CurrentSize, 10) < parseInt(product.CourseCapacity, 10)) {
                        waitlist = 0;
                    } else {
                        waitlist = parseInt(product.CurrentWaitlistSize, 10) + 1;
                    }
                } else {
                    warning = "Get Permission Code from Faculty. Wailist limit reached";
                    courseToAdd = 'COURSE_FULL';
                }
                return (
                    <li onClick={this.props.setSelectedCourse} data-id={courseToAdd} class="list-group-item list-group-item-action"><p>{product.CourseId}: {product.CourseName}  Faculty: {product.Faculty}  Term: {product.CourseTerm} Waitlist: {waitlist} {warning}</p></li>

                )

            })



            // Logic for displaying current todos
            const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
            currentTodos = productResult1.slice(indexOfFirstTodo, indexOfLastTodo);

            // Logic for displaying page numbers
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(productResult1.length / this.state.todosPerPage); i++) {
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

        return (

            <div>
                <div id="answers">
                    <ul>
                        {currentTodos}
                    </ul>
                    <div class="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {paginationBasic}
                    </div>
                </div>

            </div>

        )
    }
}

export default CourseResults;