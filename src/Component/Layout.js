import React from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Homepage from '../Component/HomePage';
import Navbar from '../Component/Navbar';
import Login from '../Component/login';
import Register from '../Component/Register';
import Profile from '../Component/profile';
import Equipe from '../Component/equipe';
import Planning from '../Component/planning';
import planningDetails from '../Component/PlanningDetails';
const Layout=()=>{


    return (
      <div>
          
          <Route path="/"  component={Navbar}/>
          <Route path="/" exact component={Homepage}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/equipe" exact component={Equipe}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/planning" exact component={Planning}/>
          <Route path="/planning/details" exact component={planningDetails}/>
      </div>  
    );
}

export default Layout;