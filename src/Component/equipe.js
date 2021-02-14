import React, { Component } from "react";
import AuthService from "../Services/authService";
import 'bootstrap/dist/css/bootstrap.min.css';
import EquipeCService from '../Services/EquipeCService';
import {Dropdown,Modal,Button,Form,Card,Table} from 'react-bootstrap';
export default class equipe extends Component{

  state = {
    currentUser: AuthService.getCurrentUser(),
    equipe:{}
  }
navigateToPlanning=(e,id)=>{
    e.preventDefault();
    this.props.history.push({
      pathname:"/planning",
      state:{
        Equipeid:id
      }
    });
}
      componentDidMount(){
          if(this.props.location.state.type=="coach"){
            EquipeCService.getEquipeById(this.props.location.state.id)
            .then( response => {
              console.log(response);
                this.setState( { equipe: response.data } );
                // console.log( response );
            } )
            .catch( error => {
                console.log( error );
                // this.setState({error: true});
            } );
          }
      }

      render (){
          const equipe=this.state.equipe;
          let content=null;
          if(equipe){
              content=(
                  <div>{equipe.id}</div>
              );
          }

          return (
            <Button variant="primary" onClick={(e)=>this.navigateToPlanning(e,this.state.equipe.id)}>
            Ajouter Planning pour cette equipe
          </Button>
          );


      }

}
