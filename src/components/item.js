import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            //<a className={`nav-item nav-link ${this.props.active}`} href="#">{this.props.name} <span className="sr-only">(current)</span></a>
            <a className={"nav-item nav-link " + this.props.active} href="#">{this.props.name} <span className="sr-only">(current)</span></a>
        )
    }
}

export default Item;

