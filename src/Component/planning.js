import React, { Component } from "react";
import AuthService from "../Services/authService";
import 'bootstrap/dist/css/bootstrap.min.css';
import planningService from '../Services/planningService';
import {Dropdown,Button,Form,Card} from 'react-bootstrap';
import cardimg from '../../src/assets/images/running-man.png';
export default class planning extends Component{
    state={
        plannings:[],
        week:"",
        jour:"",
        desc:"",
        duration1:0,
        contenu1:"",
        duration2:0,
        contenu2:""
    }

    changeweek=(e)=>{
      const value=e.target.value;
      this.setState({week:value});
    }
    changejour=(e)=>{
      const value=e.target.value;
      this.setState({jour:value});
    }
    changedesc=(e)=>{
      const value=e.target.value;
      this.setState({desc:value});
    }
    changedur1=(e)=>{
      const value=e.target.value;
      this.setState({duration1:value});
    }
    changedur2=(e)=>{
      const value=e.target.value;
      this.setState({duration2:value});
    }
    changecnt1=(e)=>{
      const value=e.target.value;
      this.setState({contenu1:value});
    }
    changectn2=(e)=>{
      const value=e.target.value;
      this.setState({contenu2:value});
    }
    
    showPlanning=(e,id)=>{
      e.preventDefault();
      this.props.history.push({
        pathname:"/planning/details",
        state:{
          id:id
        }
      });
    }
    saveplanning=(e)=>{
      e.preventDefault();
      const mystate=this.state;
      let id=1;
      if(mystate.plannings != undefined && mystate.plannings.length != 0){
        id=mystate.plannings[mystate.plannings.length-1].id+1;
      }
     planningService.addPlanning(mystate.week,mystate.jour,mystate.desc,mystate.duration1,mystate.duration2,mystate.contenu1,mystate.contenu2,id)
     .then( 
    


      planningService.getPlannings().then( response => {
        console.log(response);
        this.setState( { plannings: response.data, week:"",
        jour:"",
        desc:"",
        duration1:0,
        contenu1:"",
        duration2:0,
        contenu2:""} );
          // console.log( response );
      } ).catch( error => {
          console.log( error );
          // this.setState({error: true});
      } ))
    .catch( error => {
        console.log( error );
        // this.setState({error: true});
    } );
    }
        componentDidMount(){
            planningService.getPlannings()
            .then( response => {
                this.setState( { plannings: response.data } );
                // console.log( response );
            } )
            .catch( error => {
                console.log( error );
                // this.setState({error: true});
            } );
          }


          render(){

            let content=null;
            const plannings=this.state.plannings;
            if(plannings){
                content=plannings.map(planning=>{
                   return( <Card key={planning.id} style={{ width: '18rem' }}>
  <Card.Img variant="top" src={cardimg} />
  <Card.Body>
    <Card.Title>{planning.id}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary" onClick={(e)=>this.showPlanning(e,planning.id)}>Go somewhere</Button>
  </Card.Body>
      </Card>);
                });
            }

            return (
                <div>
                <Form>
  <Form.Group controlId="formBasicDate">
    <Form.Label>semaine</Form.Label>
    <Form.Control type="date" placeholder="Enter week" value={this.state.week}  onChange={this.changeweek}/>
  </Form.Group>

  <Form.Group controlId="formBasicText">
    <Form.Label>Seance 1</Form.Label>
    <Form.Group>
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
    <Form.Control type="text" placeholder="description" value={this.state.desc} onChange={this.changedesc}/>
    <Form.Label>Exercice 1</Form.Label>
  <Form.Group controlId="formBasicRange">
    <Form.Label>Duration</Form.Label>
    <Form.Control type="range" value={this.state.duration1} onChange={this.changedur1}/>
  </Form.Group>
  <Form.Label>Contenu</Form.Label>
    <Form.Control type="text" placeholder="contenu" value={this.state.contenu1} onChange={this.changecnt1}/>
    <Form.Label>Exercice 2</Form.Label>
  <Form.Group controlId="formBasicRange">
    <Form.Label>Duration</Form.Label>
    <Form.Control type="range"  value={this.state.duration2} onChange={this.changedur2} />
  </Form.Group>
  <Form.Label>Contenu</Form.Label>
    <Form.Control type="text" placeholder="contenu" value={this.state.contenu2}  onChange={this.changectn2}/>
  </Form.Group>
  </Form.Group>
  <Button variant="primary" type="submit" onClick={this.saveplanning}>
    Submit
  </Button>
</Form>
<div className="row">
{content}
</div>
</div>
            )
          }


      }