import React from 'react';
import '../style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Navbar.css';
const Navbar=()=>{
    return (
        <nav className="navbar">
          <ul className="navs">
            <li><NavLink to="/">Acceuil</NavLink></li>
            <li><NavLink to="/coach">Coach</NavLink></li>
            <li><NavLink to="/nutri">Nutritionniste</NavLink></li>
            <li><NavLink to="/equipe">Equipe</NavLink></li>
            <li><NavLink to="/profile">Profil</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </ul>
      </nav>
    );
}
export default Navbar;