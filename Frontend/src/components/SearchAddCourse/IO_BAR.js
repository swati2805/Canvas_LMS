import React, {Component} from 'react';


class IO_BAR extends Component {
 render() {
	const divStyle = {
			color: 'blue',
			width: '695px',
			fontSize: '17px',
		};
	return (
		<div className="screen row">
			<input className='col-xs-12 io-bar' type="text" readOnly placeholder={this.props.label} value={this.props.myinput}  style={divStyle}/>
		</div>
	);
 }
	
}

export default IO_BAR;