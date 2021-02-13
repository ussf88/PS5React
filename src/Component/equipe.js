import React, { Component } from "react";
import AuthService from "../Services/authService";
import 'bootstrap/dist/css/bootstrap.min.css';
import EquipeCService from '../Services/EquipeCService';

export default class equipe extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          currentUser: AuthService.getCurrentUser(),
          equipe:{}
        };
      }

      componentDidMount(){
          if(this.props.location.state.type="coach"){
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

          return (content);
      }

}
