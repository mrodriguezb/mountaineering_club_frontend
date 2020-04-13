import React from 'react';
import { createContext } from "react";


export const AppContext = createContext();

export class ContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            members: [],
            excursions: []
        }
        this.retrieveMembers = this.retrieveMembers.bind(this);
        this.retrieveExcursions = this.retrieveExcursions.bind(this);
        
    }

    retrieveMembers() {
        return new Promise ((resolve, reject) => {

            fetch("http://127.0.0.1:3001/members/list")
          .then(res => res.json())
          .then((json) => {
            this.setState({members: json});
            resolve(json);
                 
            })
        }    
        )        
    }

    retrieveExcursions() {
        
        fetch("http://127.0.0.1:3001/excursions/list")
          .then(res => res.json())
          .then((json) => {
              this.setState({excursions: json});      
        })
    }

    

    render() {
        return (
            <AppContext.Provider
                value={{ ...this.state, retrieveMembers: this.retrieveMembers, retrieveExcursions: this.retrieveExcursions}}>

                {this.props.children}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;