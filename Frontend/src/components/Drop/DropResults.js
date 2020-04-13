import React, { Component } from 'react';

class DropResults extends Component {

    constructor(props) {
        super(props);
        console.log(props);
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

       if (this.props.products != null) {
            productResult1 = this.props.products.map(product => {
				return(
					          <li onClick={this.props.setSelectedCourse} data-id={product.CourseId} class="list-group-item list-group-item-action"><p>{product.CourseId}</p></li>

						 )
						 
            })
        }		
		
        return (
  
            <div>			  
			<div id="answers">
                <ul>
			{productResult1}
			   </ul>
            </div>
			
			</div>
			
        )
    }
}

export default DropResults;