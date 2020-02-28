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
                <a className={'nav-item nav-link'}><Link to="/members">Members</Link></a>
            </div>
            <div className="navbar-nav">
                <a className={'nav-item nav-link'}><Link to="/excursions">Excursions</Link></a>
            </div>
        </div>
        </nav>);
    }
}

export default Navbar;

