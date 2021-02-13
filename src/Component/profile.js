import React, { Component } from "react";
import AuthService from "../Services/authService";
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown,Button} from 'react-bootstrap';
import cardimg from '../../src/assets/images/running-man.png';
import Card from 'react-bootstrap/Card';
import EquipeCService from '../Services/EquipeCService';
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      equipes:[]
    };
  }
  componentDidMount(){
    EquipeCService.getEquipeByCoach(AuthService.getCurrentUser().user.id)
    .then( response => {
      console.log(response);
        this.setState( { equipes: response.data } );
        // console.log( response );
    } )
    .catch( error => {
        console.log( error );
        // this.setState({error: true});
    } );
  }
 logout =()=>{
    AuthService.logout();
    this.props.history.push("/login");
    window.location.reload();
  }
  showEquipe=(Eid)=>{
    this.props.history.push({
      pathname:"/equipe",
      state:{
        id:Eid,
        type:"coach"
      }
    });
  }

  addEquipe=()=>{
    EquipeCService.addEquipeC();
    EquipeCService.getEquipeByCoach(AuthService.getCurrentUser().user.id)
    .then( response => {
      console.log(response);
        this.setState( { equipes: response.data } );
        // console.log( response );
    } )
    .catch( error => {
        console.log( error );
        // this.setState({error: true});
    } );
  }

  render() {
    const { currentUser } = this.state;
    let content =null;
    if(currentUser.user.roles[0].name=="JOUEUR"){
      var equipeCoach=currentUser.user.equipeCoach;
      var equipeC=null;
      if(equipeCoach!=null){
        equipeC=equipeCoach.map(equipe=>{
          return (
            <div className="col-lg-6 mb-2 pr-lg-1"><img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" className="img-fluid rounded shadow-sm" /></div>
          );
        });
      }
      var equipeNutr=currentUser.user.equipeNutrionniste;
     var  equipeN=null;
      if(equipeNutr!=null){
        equipeN=equipeNutr.map(equipe=>{
          return (
            <div className="col-lg-6 mb-2 pr-lg-1"><img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" className="img-fluid rounded shadow-sm" /></div>
          );
        });
      }
      content=equipeN+equipeC;
    }

if(currentUser.user.roles[0].name=="COACH"){
  const equipes=this.state.equipes;
  content=equipes.map(equipe=>{
    return (
      <Card key={equipe.id} style={{ width: '18rem' }}>
  <Card.Img variant="top" src={cardimg} />
  <Card.Body>
    <Card.Title>{equipe.id}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary" onClick={()=>{this.showEquipe(equipe.id)}}>Go somewhere</Button>
  </Card.Body>
      </Card>
    )
  });
}

if(currentUser.user.roles[0].name=="NUTRITIONNISTE"){
  content="nutri";
}

    return (
    <div className="row  profile-body">
    <div className="col-md-12 mx-auto">
      <div className="bg-white shadow rounded overflow-hidden">
        <div className="px-4 pt-0 pb-4 cover">
          <div className="media align-items-end profile-head">
          <Dropdown>
  <Dropdown.Toggle  id="dropdown-basic">
  <i className="fas fa-user rounded mb-2 img-thumbnail"  width={130} style={{color:"black"}}></i>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item as="button" onClick={this.logout}>Logout</Dropdown.Item>
    <Dropdown.Item as="button">My Account</Dropdown.Item>
    <Dropdown.Item as="button">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>            
            <div className="media-body mb-5 text-white">
              <h4 className="mt-0 mb-0">{currentUser.user.firstName}</h4>
              <h4 className="mt-0 mb-0">{currentUser.user.lastName}</h4>
              <p className="small mb-4"> </p>
            </div>
          </div>
        </div>
        <div className="bg-light p-4 d-flex justify-content-end text-center">
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <h5 className="font-weight-bold mb-0 d-block">Coach</h5><small className="text-muted"> <i className="fas fa-image mr-1" />Photos</small>
            </li>
            <li className="list-inline-item">
              <h5 className="font-weight-bold mb-0 d-block">Nutristionniste</h5><small className="text-muted"> <i className="fas fa-user mr-1" />Followers</small>
            </li>
            <li className="list-inline-item">
              <h5 className="font-weight-bold mb-0 d-block">340</h5><small className="text-muted"> <i className="fas fa-user mr-1" />Following</small>
            </li>
          </ul>
        </div>
        <div className="px-4 py-3">
          <h5 className="mb-0">About</h5>
          <div className="p-4 rounded shadow-sm bg-light">
            <p className="font-italic mb-0">Web Developer</p>
            <p className="font-italic mb-0">Lives in New York</p>
            <p className="font-italic mb-0">Photographer</p>
          </div>
        </div>
        <div className="py-4 px-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Recent photos</h5><a href="#" className="btn btn-link text-muted">Show all</a>
          </div>
          <div className="row">
            {content}


            <button onClick={this.addEquipe}>Ajouter Equipe</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}