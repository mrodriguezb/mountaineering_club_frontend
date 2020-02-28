import React from 'react';
import Navbar from './components/navbar.js'
import Dashboard from './components/dashboard.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Members from './components/members.js';
import Excursions from './components/excursions.js';
import EditMember from './components/editMember';
import {ContextProvider} from './context/ContextProvider.js';





class App extends React.Component {

constructor(props) {
  super(props);

}

  render() {

    return (
      <div>
        <ContextProvider>
          <Router>
            <Switch>
              <Route path="/" exact component = {Dashboard}/>
              <Route path="/members" exact component = {Members}/>
              <Route path="/excursions" exact component = {Excursions}/>
              <Route path= "/editmember" component={EditMember} />
            </Switch>
          </Router>
          </ContextProvider>
      
      </div>
    );
  }
}


export default App;
/*
<div className="App">
        <Navbar {...this.props}/>
        <header className="App-header">
          <Dashboard/>
          <br/>
       
        </header>
      </div>*/