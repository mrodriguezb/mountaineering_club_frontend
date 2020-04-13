import React from "react";
import { AppContext } from "./../context/ContextProvider";
import Navbar from "./navbar";





class EditExcursion extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        
       
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleIdsChange = this.handleDateChange.bind(this);
        this.editExcursion = this.editExcursion.bind(this);
        this.deleteExcursion = this.deleteExcursion.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.addMemberToExcursion = this.addMemberToExcursion.bind(this);
        
        this.state = {
          listOfMembers : []
        }
        
    }

 

    componentDidMount() {
        //console.log(this.props.location.state.id);
        //console.log(this.context.members);
        this.context.retrieveMembers();

        let currentExcursion = this.context.excursions.find(excursion => (excursion._id == this.props.location.state.id));
        this.setState({currentExcursion})

       let copyOfMembers = this.context.members.filter(member => member._id);
       this.setState({
           listOfMembers: copyOfMembers
       })
    }

    componentDidUpdate() {

    }

    handleDateChange(event) {
        this.setState({ currentExcursion: {...this.state.currentExcursion, date: event.target.value}});
    }

    handleNameChange(event) {
        this.setState({ currentExcursion: {...this.state.currentExcursion, name: event.target.value}});
    }

    handleIdsChange(event) {
        this.setState({ users_id: event.target.value });
    }

    handleIdChange (e, index) {
        this.state.users_id[index] = e.target.value;

        //set the change state
        this.setState({users_id: this.state.users_id})


    }

    addMemberToExcursion(event) {
        
        event.preventDefault();
        let select = document.getElementById("availableUsers");
        let options = select.options;
        options = Array.from(options);
        
        
        let mermbersList = this.context.members
        let membersId = options.filter( opt => opt.selected ).map( opt => opt.value );

        //que te filtre y te devuelva el elemento del array con los elementos que no has seleccionado

        let otherMembers = this.state.listOfMembers.filter(member => !membersId.includes(member._id));
        console.log("almacenado en otherMembers");
        console.log(otherMembers);


        let members = membersId && this.context.members.filter(element => membersId.includes(element._id));
        

        
        this.setState({ currentExcursion: {...this.state.currentExcursion, members_info: [...this.state.currentExcursion.members_info, ...members]}});
        this.setState({listOfMembers: otherMembers});

        


    }


    editExcursion(event) {
          
          event.preventDefault();
        
        fetch('http://127.0.0.1:3001/excursions/', {
            method: 'PUT',
            body: JSON.stringify({
                _id: this.state.currentExcursion._id,
                name: this.state.currentExcursion.name,
                date: this.state.currentExcursion.date,
                users_id: this.state.currentExcursion.users_id

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        //this is what we are getting from the url above
            .then(response => response.json())
            .then(response => alert(JSON.stringify(response)))
            .then(response => alert("Modified excursion: " + " Name: " + this.state.currentExcursion.name + " Date: " + this.state.currentExcursion.date ))
            .then(this.props.history.push("/excursions"));
       
            
    }


   
    deleteExcursion(event) {
        event.preventDefault();
        fetch('http://127.0.0.1:3001/excursions/delete/' + this.props.location.state.id, {
        method: 'DELETE'
        
    })
   .then(response => alert("Deleted excursion: " + " Name: " + this.state.currentExcursion.name + " Date: " + this.state.currentExcursion.date ))
   .then(this.props.history.push("/excursions"));
    
  }

  /* esta es otra manera de hacer delete, en este caso pasariamos en el on click del boton que llama a la funcion onClick={this.deleteMember(this.props.location.state.id)}
  
  deleteMember(id) {
    event.preventDefault();
    fetch('http://127.0.0.1:3001/members/delete/' + id, {
    method: 'DELETE'
    
})
.then(response => alert("Deleted user: " + " Name: " + this.state.name + " Surname: " + this.state.surname ));

}*/

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
                                    <h5 className="card-title text-center">Excursion details</h5>
                                    <form className="form-signin">
                                        <div className="form-label-group">
                                            <label>Name</label>
                                            <input type="text" id="inputUserName" className="form-control" value={this.state.currentExcursion?.name} onChange={this.handleNameChange} required autofocus />
                                            
                                        </div>
    
                                        <div className="form-label-group">
                                            <label>Date</label>
                                            <input type="text" id="inputName" className="form-control" value={this.state.currentExcursion?.date} onChange={this.handleDateChange} required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>Members Joined to Excursion</label>
                                            <select multiple id="joinedUsers" className="form-control" /*onChange={this.handleIdsChange}*/  >
                                            {
                                                this.state.currentExcursion?.members_info.map(user => {
                                                    return (
                                                    <option value={user._id}>{user.name}</option>
                                              
                                                    )
                                                })
                                            }
                                            </select>
                                            </div>
                                        
                                            <div className="form-label-group">

                                            <label>List of members</label>
                                            <select multiple id="availableUsers" className="form-control" /*onChange={this.handleIdsChange}*/  >
                                            {
                                                this.state.listOfMembers.map(user => {
                                                    return (
                                                    <option value={user._id}>{user.name}</option>
                                              
                                                    )
                                                })
                                            }
                                            </select>
                                            <button onClick={(e) => this.addMemberToExcursion(e)}>Add members to excursion</button>
                                        </div>
                                                                                                              
    
                                        <br/>
                                        <div className="form-label-group">
                                        <button type="button" className="btn btn-primary btn-lg" onClick={this.editExcursion} disabled={this.state.submitDisabled}>Edit excursion</button>
                                        <div className="float-right">


                                        <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalDeleteExcursion" /*onClick={this.deleteConfirmation}*/>Delete excursion</button>

                                        </div>
                                        
                                        <div className="modal fade" id="modalDeleteExcursion" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Are you sure you want to delete this excursion?:</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                </div>
                                                <div className="modal-body">

                                                <div>{" Name: " + this.state.currentExcursion?.name + " Date: " + this.state.currentExcursion?.date} </div>

                                                </div>
                                                <div className="modal-footer">
                                                
                                                
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.cancelButton}>Cancel</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.deleteExcursion}>Confirm delete</button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                            
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

export default EditExcursion;