import React from "react";
import Navbar from "./navbar";
import { AppContext } from "./../context/ContextProvider";


class Excursions extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props); 
    }

    componentDidMount() {
       this.context.retrieveExcursions(); 
    }

    

    render() {
        return (<div className="container">
                <div><Navbar/></div>
                <div>{this.context.excursions.map(element =>  <ul class="list-group list-group-flush"><li class="list-group-item">{element.name}</li></ul>)}</div>
                </div>)
        
    }
}

export default Excursions;