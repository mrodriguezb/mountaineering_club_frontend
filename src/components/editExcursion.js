import React from "react";
import { AppContext } from "./../context/ContextProvider";
import Navbar from "./navbar";




class EditExcursion extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        //const memberId = props.location.state.id;
        this.state = {
            id: "",
            name: "",
            date: "",
            users_id: []

        }
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleIdsChange = this.handleDateChange.bind(this);
        this.editExcursion = this.editExcursion.bind(this);
        this.deleteExcursion = this.deleteExcursion.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
        
        
    }

 

    componentDidMount() {
        //console.log(this.props.location.state.id);
        //console.log(this.context.members);
        let filteredList = this.context.excursions.filter(excursion => (excursion._id == this.props.location.state.id));
        filteredList.length > 0 && this.setState({
            users_id: filteredList[0].users_id,
            name: filteredList[0].name, 
            date:filteredList[0].date, 
            id: filteredList[0]._id });

    }

    componentDidUpdate() {

    }

    handleDateChange(event) {
        this.setState({ date: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleIdsChange(event) {
        this.setState({ users_id: event.target.value });
    }

   

    editExcursion(event) {
          
          event.preventDefault();
        
        fetch('http://127.0.0.1:3001/excursions/', {
            method: 'PUT',
            body: JSON.stringify({
                _id: this.state.id,
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
            .then(response => alert("Modified excursion: " + " Name: " + this.state.name + " Date: " + this.state.date ))
            .then(this.props.history.push("/excursions"));
       
            
    }
   
    deleteExcursion(event) {
        event.preventDefault();
        fetch('http://127.0.0.1:3001/excursions/delete/' + this.props.location.state.id, {
        method: 'DELETE'
        
    })
   .then(response => alert("Deleted excursion: " + " Name: " + this.state.name + " Date: " + this.state.date ))
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
                                            <input type="text" id="inputUserName" className="form-control" value={this.state.name} onChange={this.handleNameChange} required autofocus />
                                            
                                        </div>
    
                                        <div className="form-label-group">
                                            <label>Date</label>
                                            <input type="text" id="inputName" className="form-control" value={this.state.date} onChange={this.handleDateChange} required />
                                            
                                        </div>
                                        <div className="form-label-group">
                                            <label>Members Id</label>
                                            <input type="text" id="inputName" className="form-control" value={this.state.users_id} onChange={this.handleIdsChange} required />
                                            
                                        </div>
                                        
                                        <br/>
                                        <button type="button" className="btn btn-primary btn-lg" onClick={this.editExcursion} disabled={this.state.submitDisabled}>Edit excursion</button>
                                        <div className="float-right">


                                        <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalDeleteExcursion" /*onClick={this.deleteConfirmation}*/>Delete excursion</button>
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

                                                <div>{" Name: " + this.state.name + " Surname: " + this.state.surname} </div>

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