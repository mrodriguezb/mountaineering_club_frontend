import React from "react";
import { AppContext } from "./../context/ContextProvider";
import Navbar from "./navbar";




class CreateExcursion extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        //const memberId = props.location.state.id;
        this.state = {
           
            name: "",
            date: "",
            users_id: []
        }
        
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleUsersIdChange = this.handleUsersIdChange.bind(this);
        
        this.createExcursion = this.createExcursion.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
        
    }

 

    componentDidMount() {
        
    }

    componentDidUpdate() {

    }

    

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleDateChange(event) {
        this.setState({ date: event.target.value });
    }

    handleUsersIdChange(event) {
        this.setState({ users_id: event.target.value });
    }

   

    createExcursion(event) {
          

          event.preventDefault();
        
        fetch('http://127.0.0.1:3001/excursions/', {
            method: 'POST',
            body: JSON.stringify({
                
                name: this.state.name,
                date: this.state.date,
                users_id: this.state.users_id
                

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        //this is what we are getting from the url above
            .then(response => response.json())
            .then(response => alert(JSON.stringify(response)))
            .then(response => alert("Created excursion: " + " Name: " + this.state.name + " Date: " + this.state.date ))
            .then(this.props.history.push("/excursions"));
       
            
    }
   
    cancelButton() {
        this.props.history.push("/excursions");
    }


    render() {
        return (
            
                <div className="container">
                    <Navbar/>
                    <div className="row">
                        <div className="col-lg-10 col-xl-9 mx-auto">
                            <div className="card card-signin flex-row my-5">
                                <div className="card-img-left d-none d-md-flex">
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-center">Excursion details</h5>
                                    <form className="form-signin">
                                    
                                        <div className="form-label-group">
                                            <label>Name</label>
                                            <input type="text" id="inputUserName" className="form-control"  onChange={this.handleNameChange} required autofocus />
                                            
                                        </div>
    
                                        <div className="form-label-group">
                                            <label>Date</label>
                                            <input type="text" id="inputName" className="form-control"  onChange={this.handleDateChange} required />
                                            
                                        </div>

                                        <div className="form-label-group">
                                            <label>Users Id</label>
                                            <input type="text" id="inputName" className="form-control"  onChange={this.handleUsersIdChange} required />
                                            
                                        </div>
                                        
                                        <br/>
                                        <button type="button" className="btn btn-primary btn-lg" onClick={this.createExcursion} disabled={this.state.submitDisabled}>Create excursion</button>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    
        }
    }

export default CreateExcursion;