import React, { Component } from "react";
import '../style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import image from '../assets/images/running-man.png';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import step1 from '../assets/images/step1.png';
import step2 from '../assets/images/step2.png';
import step3 from '../assets/images/step3.png';
import { Link } from "react-router-dom";



export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
      <div id="content-wrapper">
        <header className="header header--bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <img className="img-responsive" src={image}alt="" />
              </div>
              <div className="col-lg-6 header__content">
                <h1 className="title">E-GYM <span className="title-style" /></h1>
                <p>FITNESS A DISTANCE</p>
                <span className="header__button" >Login</span>
                <span className="header__button" >CREE UN COMPTE</span>
              </div>
            </div>
          </div>
        </header>
        <section className="steps">
          <div className="container">
            <div className="page-section text-center">
              <h2 className="page-section__title">3 etapes Simple</h2>
              <div className="page-section__title-style">
                <span className="first-line" />
                <span className="second-line" />
              </div>
              <p className="page-section__subtitle" />
              <div className="row">
                <div className="col-md-4">
                  <div className="text-center steps__single steps__single-first">
                    <img src={step1} alt="" />
                    <p>CREE UN COMPTE</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center steps__single">
                    <img src={step2} alt="" />
                    <p>INSCRIRE AVEC UN COACH</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center steps__single steps__single-last">
                    <img src={step3} alt="" />
                    <p>REJOIGNER UNE EQUIPE</p>
                  </div>
                </div>
              </div>
              <Link to="/register"><span className="button" >CREE UN COMPTE MAITENANT</span></Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}