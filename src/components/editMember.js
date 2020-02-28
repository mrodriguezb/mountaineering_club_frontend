import React from "react";
import { AppContext } from "./../context/ContextProvider";
import Navbar from "./navbar";

class EditMember extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        //const memberId = props.location.state.id;
        this.state = {
            id: "",
            name: "",
            surname: "",
            birthDate: "",
            clubId: "",
            licenseNumber: "",
            type: ""


        }
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.editMember = this.editMember.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
    }

 

    componentDidMount() {
        console.log(this.props.location.state.id);
        console.log(this.context.members);
        let filteredList = this.context.members.filter(member => (member._id == this.props.location.state.id));
        filteredList.length > 0 && this.setState({
            name: filteredList[0].name, 
            surname:filteredList[0].surname, 
            birthDate: filteredList[0].birthDate, 
            clubId: filteredList[0].clubId, 
            licenseNumber: filteredList[0].licenseNumber, 
            type: filteredList[0].type, 
            responsibilityAgreementSigned: filteredList[0].responsibilityAgreementSigned,
            id: filteredList[0]._id });

    }

    componentDidUpdate() {

    }

    handleSurnameChange(event) {
        this.setState({ surname: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

   

    editMember(event) {
          //alert ("New user: " + " Username: " + this.state.userName + " Name: " + this.state.name + + " Email: " +this.state.email);

          event.preventDefault();
        
        fetch('http://127.0.0.1:3001/members/', {
            method: 'PUT',
            body: JSON.stringify({
                _id: this.state.id,
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
            .then(response => alert(JSON.stringify(response)));
       
            
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
                                            <input type="text" id="inputUserName" className="form-control" value={this.state.name} onChange={this.handleNameChange} required autofocus />
                                            
                                        </div>
    
                                        <div className="form-label-group">
                                            <label>Surname</label>
                                            <input type="text" id="inputName" className="form-control" value={this.state.surname} onChange={this.handleSurnameChange} required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>Birth date</label>
                                            <input type="text" id="inputEmail" className="form-control" value={this.state.birthDate} /*onChange={this.handleBirthChange} */required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>Club Id</label>
                                            <input type="text" id="inputEmail" className="form-control" value={this.state.clubId} /*onChange={this.handleClubChange}*/ required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>License Number</label>
                                            <input type="text" id="inputEmail" className="form-control" value={this.state.licenseNumber} /*onChange={this.handleLicenseChange} */required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>Type</label>
                                            <input type="text" id="inputEmail" className="form-control" value={this.state.type} /*onChange={this.handleTypeChange}*/ required />
                                            
                                        </div>
                                        <button type="button" class="btn btn-primary btn-lg" onClick={this.editMember} disabled={this.state.submitDisabled}>Edit member</button>
                                        <div className="float-right">
                                            <button type="button" class="btn btn-secondary btn-lg btn-secondary" onClick={this.cancelButton}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    
        }
    }

export default EditMember;