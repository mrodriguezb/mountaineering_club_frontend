import React from "react";
import { AppContext } from "./../context/ContextProvider";
import Navbar from "./navbar";




class CreateMember extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        //const memberId = props.location.state.id;
        this.state = {
           
            name: "",
            surname: "",
            birthDate: "",
            clubId: "",
            licenseNumber: "",
            type: "",
            responsibilityAgreementSigned: true


        }
        
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleBirthdateChange = this.handleBirthdateChange.bind(this);
        this.handleClubIdChange = this.handleClubIdChange.bind(this);
        this.handleLicenseChange = this.handleLicenseChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleRasChange = this.handleRasChange.bind(this);
        this.createMember = this.createMember.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
        
    }

 

    componentDidMount() {
        
    }

    componentDidUpdate() {

    }

    

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSurnameChange(event) {
        this.setState({ surname: event.target.value });
    }

    handleBirthdateChange(event) {
        this.setState({ birthDate: event.target.value });
    }

    handleClubIdChange(event) {
        this.setState({ clubId: event.target.value });
    }

    handleLicenseChange(event) {
        this.setState({ licenseNumber: event.target.value });
    }

    handleTypeChange(event) {
        this.setState({ type: event.target.value });
    }

    handleRasChange(event) {
        this.setState({ responsibilityAgreementSigned: event.target.checked });
    }

   

    createMember(event) {
          //alert ("New user: " + " Username: " + this.state.userName + " Name: " + this.state.name + + " Email: " +this.state.email);

          event.preventDefault();
        
        fetch('http://127.0.0.1:3001/members/', {
            method: 'POST',
            body: JSON.stringify({
                
                name: this.state.name,
                surname: this.state.surname,
                birthDate: this.state.birthDate,
                clubId: this.state.clubId,
                licenseNumber: this.state.licenseNumber,
                type: this.state.type,
                responsibilityAgreementSigned: this.state.responsibilityAgreementSigned

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        //this is what we are getting from the url above
            .then(response => response.json())
            .then(response => alert(JSON.stringify(response)))
            .then(response => alert("Created member: " + " Name: " + this.state.name + " Surname: " + this.state.surname ))
            .then(this.props.history.push("/members"));
       
            
    }
   
    cancelButton() {
        this.props.history.push("/members");
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
                                    <h5 className="card-title text-center">Member details</h5>
                                    <form className="form-signin">
                                    
                                        <div className="form-label-group">
                                            <label>Name</label>
                                            <input type="text" id="inputUserName" className="form-control"  onChange={this.handleNameChange} required autofocus />
                                            
                                        </div>
    
                                        <div className="form-label-group">
                                            <label>Surname</label>
                                            <input type="text" id="inputName" className="form-control"  onChange={this.handleSurnameChange} required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>Birth date</label>
                                            <input type="text" id="inputEmail" className="form-control"  onChange={this.handleBirthdateChange} required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>Club Id</label>
                                            <input type="text" id="inputEmail" className="form-control"  onChange={this.handleClubIdChange} required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>License Number</label>
                                            <input type="text" id="inputEmail" className="form-control"  onChange={this.handleLicenseChange} required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>Type</label>
                                            <input type="text" id="inputEmail" className="form-control" onChange={this.handleTypeChange} required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>Click if you signed the Responsability Agreement</label>
                                            <input type="checkbox" id="inputEmail" className="form-control" onChange={this.handleRasChange} required/>
                                            
                                        </div>
                                        <br/>
                                        <button type="button" className="btn btn-primary btn-lg" onClick={this.createMember} disabled={this.state.submitDisabled}>Create member</button>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    
        }
    }

export default CreateMember;