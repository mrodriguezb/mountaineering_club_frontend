import React from 'react';
import Item from '../components/item';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";


class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <a /*className={'nav-item nav-link'}*/ className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"><Link to="/members">Members</Link></a>
                <ul class="dropdown-menu">
                <li><Link to="/members">List</Link></li>
                <li><Link to="/createmember">Create</Link></li>
                
            </ul>
            </div>
            <div className="navbar-nav">
            <a /*className={'nav-item nav-link'}*/ className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"><Link to="/excursions">Excursions</Link></a>
                <ul class="dropdown-menu">
                <li><Link to="/excursions">List</Link></li>
                <li><Link to="/createexcursion">Create</Link></li>
                
            </ul>
               
            </div>
        </div>
        </nav>);
    }
}

export default Navbar;



