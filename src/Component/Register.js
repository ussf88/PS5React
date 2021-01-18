import React, { Component } from "react";

import AuthService from "../Services/authService";



export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangefirstname = this.onChangefirstname.bind(this);
    this.onChangeUserRole=this.onChangeUserRole.bind(this);

    this.state = {
      username: "",
      firstName:"",
      lastName:"",
      email: "",
      password: "",
      successful: false,
      message: "",
      role:""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeUserRole(e) {
    this.setState({
      role: e.target.value
    });
  }
  onChangefirstname(e) {
    this.setState({
      firstName: e.target.value
    });
  }


  onChangeLastname(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

   switch(this.state.role){
     case "JOUEUR":
      AuthService.registerJoueur(
        this.state.username,
        this.state.email,
        this.state.password,
        null,
        this.state.firstName,
        this.state.lastName,
        null,
        null
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          this.props.history.push("/login");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
      break;
     case "COACH":
      AuthService.registerCoach(
        this.state.username,
        this.state.email,
        this.state.password,
        null,
        this.state.firstName,
        this.state.lastName,
        null
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          this.props.history.push("/login");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
      break;
     case "NUTRITIONNISTE":
        AuthService.registerNUTRITIONNISTE(
          this.state.username,
          this.state.email,
          this.state.password,
          null,
          this.state.firstName,
          this.state.lastName,
          null
        ).then(
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            });
            this.props.history.push("/login");
            window.location.reload();
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
        break; 

   }
      
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">


          <form
            onSubmit={this.handleRegister}>
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangefirstname}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastname}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select value={this.state.role}
                    onChange={this.onChangeUserRole}>
                    <option value="JOUEUR" defaultValue>JOUEUR</option>
                    <option value="COACH">Coach</option>
                    <option value="NUTRITIONNISTE">NUTRITIONNISTE</option>
                  </select>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}