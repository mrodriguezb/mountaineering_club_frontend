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

class Members extends React.Component {

    static contextType = AppContext;


    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
       this.context.retrieveMembers();
       
    }


    render() {
        return (<div className="container">

        <div><Navbar/></div>

        
        <div>{this.context.members.map(member => 
            <ul class="list-group list-group-flush"><li class="list-group-item"><Link to = {{ pathname: '/editmember', state: {id: member._id}}}>
                {member.name} {member.surname}
                </Link></li></ul>)}
        </div>
        </div>)
    }
}

export default Members;
