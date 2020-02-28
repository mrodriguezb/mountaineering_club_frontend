import React from 'react';
import Members from './members';
import Navbar from './navbar';

 
class Dashboard extends React.Component {
 
    

    constructor(props){
        super(props);
        
    }

    componentDidMount() {
        
    }

 
    render() {
        
        return  (
            <div className="container">
                <div><Navbar/></div>
            </div>
        );
       } 
    }


export default Dashboard;