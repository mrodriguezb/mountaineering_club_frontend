import React from "react";
import Navbar from "./navbar";
import { AppContext } from "./../context/ContextProvider";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";


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
                <div>{this.context.excursions.map(excursion =>  <ul class="list-group list-group-flush"><li class="list-group-item"><Link to = {{ pathname: '/editexcursion', state: {id: excursion._id}}}>{excursion.name}</Link></li></ul>)}</div>
                </div>)
        
    }
}

export default Excursions;

