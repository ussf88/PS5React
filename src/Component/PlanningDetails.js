import React, { Component } from "react";
import AuthService from "../Services/authService";
import './profile.css';
import {Dropdown,Modal,Button,Form,Card,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import planningService from '../Services/planningService';
import seanceService from '../Services/seanceService';
import ExoService from '../Services/ExerciceService';
export default class PlanningDetails extends Component {


    state={
        pid:0,
        planning:{},
        showModelAdd:false,
        showModelChange:false,
        showModelDelete:false,
        jour:"Lundi",
        description:"",
        sid:0,
        exoSid:0,
        showModelExo:false,
        exoDuration:0,
        exoContenu:""

    }
    changedur=(e)=>{
        const value=e.target.value;
        this.setState({exoDuration:value});
      }
      changecnt=(e)=>{
        const value=e.target.value;
        this.setState({exoContenu:value});
      }
  

    toggleModelAdd=()=>{
        const showmodel=!this.state.showModelAdd;
        this.setState({showModelAdd:showmodel});
    }
    toggleModelChange=()=>{
        const showmodel=!this.state.showModelChange;
        this.setState({showModelChange:showmodel});
    }
    toggleModelDelete=()=>{
        const showmodel=!this.state.showModelDelete;
        this.setState({showModelDelete:showmodel});
    }
    toggleModelExo=()=>{
        const showmodel=!this.state.showModelExo;
        this.setState({showModelExo:showmodel});
    }
    saveExercice=()=>{
        ExoService.saveExo(this.state.exoDuration,this.state.exoContenu,this.state.exoSid).then(reponse=>{
            this.toggleModelExo();
            planningService.getPlanning(this.state.pid)
            .then( response => {
                this.setState( { planning: response.data } );
                console.log(response);
                // console.log( response );
            } );
        });
    }
    saveSeance=()=>{
      seanceService.addSeance(this.state.jour,this.state.description,this.state.pid).then(reponse=>{
          this.toggleModelAdd();
          planningService.getPlanning(this.state.pid)
          .then( response => {
              this.setState( { planning: response.data } );
              console.log(response);
              // console.log( response );
          } );
      })
    }
    deleteSeance=()=>{
        seanceService.deleteSeance(this.state.sid).then(reponse=>{
            this.toggleModelDelete();
            planningService.getPlanning(this.state.pid)
          .then( response => {
              this.setState( { planning: response.data } );
              console.log(response);
              // console.log( response );
          } );
        })
    }

    fillForm=(jour,description)=>{
        this.setState({jour,description});
        this.toggleModelChange();
    }
    fillFormExo=(id)=>{
        this.setState({exoSid:id});
        this.toggleModelExo();
    }
    fillFormDelete=(id)=>{
        this.setState({sid:id});
        this.toggleModelDelete();
    }
    changeSeance=()=>{
        seanceService.changeSeance(this.state.jour,this.state.description,this.state.pid).then(reponse=>{
            this.toggleModelChange();
            planningService.getPlanning(this.state.pid)
            .then( response => {
                this.setState( { planning: response.data } );
                console.log(response);
                // console.log( response );
            } );
        })
      }
    changejour=(e)=>{
        const value=e.target.value;
        this.setState({jour:value});
      }
      changedesc=(e)=>{
        const value=e.target.value;
        this.setState({description:value});
      }

    componentDidMount(){
        planningService.getPlanning(this.props.location.state.id)
        .then( response => {
            this.setState( { planning: response.data,pid:this.props.location.state.id } );
            console.log(response);
            // console.log( response );
        } )
        .catch( error => {
            console.log( error );
            // this.setState({error: true});
        } );
      }

      render(){

        let content=null;
        let planning=this.state.planning;
        if(Object.keys(planning).length!=0){
            content=planning.seances.map(seance=>{
                return(
                <tr key={seance.id}>
                <td>Seance {seance.id}</td>
                <td> {seance.jour}</td>
                <td> {seance.description}</td>
                <td> <Button variant="secondary" onClick={()=>this.fillForm(seance.jour,seance.description)}>
       Modifier
      </Button>
      <Button variant="secondary" onClick={()=>this.fillFormDelete(seance.id)}>
        Supprimer
      </Button></td>
                {seance.exercises.map(exo=>{
                    return(
                         <td>Duration :{exo.duration}min <br/>
                    more 
                    </td>
                    );
                })}
               <td><Button variant="secondary" onClick={()=>this.fillFormExo(seance.id)}>
       Ajouter Exercice
      </Button></td>
                




                </tr>

                );
            })
        }
        return( 
            <div>
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Seances</th>
            <th>Jour</th>
            <th>Description</th>
            <th>Manipuler</th>
            <th>Exercice 1</th>
            <th>Exercice 2</th>
            <th>Exercice 3</th>
            <th>Exercice 4</th>
            <th>Exercice 5</th>
            <th>Exercice 6</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </Table>



<Button variant="primary" onClick={this.toggleModelAdd}>
        Ajouter Seance
      </Button>

      <Modal show={this.state.showModelAdd} onHide={this.toggleModelAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control as="select" size="lg" placeholder="jour" value={this.state.jour}  onChange={this.changejour}>
    <option>Lundi</option>
    <option>Mardi</option>
    <option>Mercredi</option>
    <option>Jeudi</option>
    <option>Venddredi</option>
    <option>Samedi</option>
    <option>Dimanche</option>
  </Form.Control>

  <Form.Label>description</Form.Label>
    <Form.Control type="text" placeholder="description" value={this.state.description} onChange={this.changedesc}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleModelAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={this.saveSeance}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={this.state.showModelChange} onHide={this.toggleModelChange}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control as="select" size="lg" placeholder="jour" value={this.state.jour}  onChange={this.changejour}>
    <option>Lundi</option>
    <option>Mardi</option>
    <option>Mercredi</option>
    <option>Jeudi</option>
    <option>Venddredi</option>
    <option>Samedi</option>
    <option>Dimanche</option>
  </Form.Control>

  <Form.Label>description</Form.Label>
    <Form.Control type="text" placeholder="description" value={this.state.description} onChange={this.changedesc}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleModelChange}>
            Close
          </Button>
          <Button variant="primary" onClick={this.changeSeance}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={this.state.showModelDelete} onHide={this.toggleModelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Vous etes Sur ?!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleModelDelete}>
            Close
          </Button>
          <Button variant="primary" onClick={this.deleteSeance}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={this.state.showModelExo} onHide={this.toggleModelExo}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="formBasicRange">
    <Form.Label>Duration</Form.Label>
    <Form.Control type="range" value={this.state.exoDuration} onChange={this.changedur}/>
  </Form.Group>
  <Form.Label>Contenu</Form.Label>
    <Form.Control type="text" placeholder="contenu" value={this.state.exoContenu} onChange={this.changecnt}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleModelExo}>
            Close
          </Button>
          <Button variant="primary" onClick={this.saveExercice}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>



      </div>
            );
    }


}