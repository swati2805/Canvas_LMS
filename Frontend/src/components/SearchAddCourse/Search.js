import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className="border mt-5 search-container">
                <div className="form-group mt-3 mb-3 ml-5 mr-5">
                    <input type="text" name="search" id="search" className="form-control form-control-lg" placeholder="Search" 
                    onChange={this.props.searchProduct} />
                </div>
                <div className="form-group mt-3">
                    <button className="btn btn-primary btn-lg" >Search</button>
                </div>
            </div>
        )
    }
}

export default Search;